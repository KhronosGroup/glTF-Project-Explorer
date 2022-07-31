import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";
import FilterBarOptions from "./FilterBarOptions";
import "./FilterBar.css";
import FilterBarSelected from "./FilterBarSelected";
import { ProjectFilterProperties } from "../interfaces/IProjectInfo"

interface IFilterBarOwnProps {
  allowCollapse: boolean;
}

interface IFilterBarProps {
  filterOptions: Record<string, IFilter[]>;
  selectedFilters: Set<IFilter>;
  allowCollapse: boolean;
  updateSelectedFilters: typeof updateSelectedFilters;
}

// TODO_GENERALIZATION This had to be adjusted quite a bit, but is very much a draft and should be reviwed!

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
      updateSelectedFilters(selectedFilters);
    },
    [selectedFilters, updateSelectedFilters]
  );

  const handleFilterRemoveClick = useCallback(
    (filter: IFilter) => (_: React.MouseEvent) => {
      selectedFilters.delete(filter);
      updateSelectedFilters(selectedFilters);
    },
    [selectedFilters, updateSelectedFilters]
  );

  const handleFilterResetClick = useCallback(
    (_) => {
      selectedFilters.clear();
      updateSelectedFilters(selectedFilters);
    },
    [selectedFilters, updateSelectedFilters]
  );

  const filterBarOptions = [];
  const filterPropertyNames = Object.keys(filterOptions);
  
  //console.log("filterOptions ", filterOptions);

  for (var i = 0; i < filterPropertyNames.length; i++) {
    const filterPropertyName = filterPropertyNames[i];
    const filterValues = filterOptions[filterPropertyName];
    const name = ProjectFilterProperties[filterPropertyName];
    const label = "Filter by " + name;
    filterBarOptions.push(
      <FilterBarOptions
      filters={filterValues}
      label={label} 
      allowCollapse={allowCollapse}
      addAction={handleFilterAddClick}
    />
    );
  }
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
        {filterBarOptions}
      </div>
    </div>
  );
};

function mapStateToProps(state: IAppState, ownProps: IFilterBarOwnProps) {

  const filterOptions = state.filters.filterOptions;
  const selected = state.filters.selected;

  const { allowCollapse } = ownProps;

  console.log("state ", state);
  console.log("state.filters ", state.filters);
  console.log("state ", state);
 
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
