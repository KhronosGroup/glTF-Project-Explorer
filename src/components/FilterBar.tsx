import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";
import FilterBarOptions from "./FilterBarOptions";
import "./FilterBar.css";
import FilterBarSelected from "./FilterBarSelected";
import { ProjectFilterProperties } from "../interfaces/IProjectInfo";

interface IFilterBarOwnProps {
  allowCollapse: boolean;
}

interface IFilterBarProps {
  filterOptions: Map<string, IFilter[]>;
  selectedFilters: Set<IFilter>;
  allowCollapse: boolean;
  updateSelectedFilters: typeof updateSelectedFilters;
}

const FilterBar: React.FC<IFilterBarProps> = (props) => {
  const {
    filterOptions,
    selectedFilters,
    allowCollapse,
    updateSelectedFilters,
  } = props;

  const [isVisible, setIsVisible] = useState(!allowCollapse);

  // This effect updates the collapse state preventing edge cases where the user can't see
  //   the expanded filter bar in a desktop layout.
  useEffect(() => {
    setIsVisible(!allowCollapse);
  }, [allowCollapse]);

  const toggleVisibility = useCallback(() => {
    if (allowCollapse) {
      setIsVisible(!isVisible);
    }
  }, [allowCollapse, isVisible, setIsVisible]);

  const handleFilterAddClick = useCallback(
    (filter: IFilter) => (_: React.MouseEvent) => {
      selectedFilters.add(filter);
      const options = filterOptions.get(filter.propertyName);
      if (options) {
        const index = options.indexOf(filter);
        options.splice(index, 1);
      }
      updateSelectedFilters(selectedFilters);
    },
    [filterOptions, selectedFilters, updateSelectedFilters]
  );

  const handleFilterRemoveClick = useCallback(
    (filter: IFilter) => (_: React.MouseEvent) => {
      selectedFilters.delete(filter);
      const options = filterOptions.get(filter.propertyName);
      if (options) {
        options.push(filter);
        options.sort((f0, f1) => f0.value.localeCompare(f1.value));
      }
      updateSelectedFilters(selectedFilters);
    },
    [filterOptions, selectedFilters, updateSelectedFilters]
  );

  const handleFilterResetClick = useCallback(
    (_) => {
      for (const filter of selectedFilters) {
        const options = filterOptions.get(filter.propertyName);
        if (options) {
          options.push(filter);
        }
      }
      for (const options of filterOptions.values()) {
        options.sort((f0, f1) => f0.value.localeCompare(f1.value));
      }
      selectedFilters.clear();
      updateSelectedFilters(selectedFilters);
    },
    [filterOptions, selectedFilters, updateSelectedFilters]
  );

  return (
    <div className="m-4 rounded bg-near-white p-4 shadow-sharp">
      <h1
        className={`m-0 block p-0 text-2xl ${
          allowCollapse && "cursor-pointer"
        }`}
        onClick={toggleVisibility}
      >
        Filter Results {allowCollapse && (isVisible ? "▲" : "▼")}
      </h1>
      <div className={isVisible ? "" : "hidden"}>
        <FilterBarSelected
          selectedFilters={selectedFilters}
          removeAction={handleFilterRemoveClick}
          resetAction={handleFilterResetClick}
        />
      </div>
      {[...filterOptions.entries()].map((entry) => {
        return (
          <FilterBarOptions
            key={entry[0]}
            filters={entry[1]}
            label={`Filter by ${ProjectFilterProperties.get(entry[0])}`}
            allowCollapse={allowCollapse}
            addAction={handleFilterAddClick}
          />
        );
      })}
    </div>
  );
};

function mapStateToProps(state: IAppState, ownProps: IFilterBarOwnProps) {
  const filterOptions = state.filters.filterOptions;
  const selected = state.filters.selected;

  const { allowCollapse } = ownProps;

  return {
    filterOptions,
    selectedFilters: selected,
    allowCollapse: allowCollapse,
  };
}

const mapDispatchToProps = {
  updateSelectedFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
