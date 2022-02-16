import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";
import FilterBarOptions from "./FilterBarOptions";
import "./FilterBar.css";
import FilterBarSelected from "./FilterBarSelected";

export interface IFilterBarOwnProps {
  allowCollapse: boolean;
}

export interface IFilterBarProps {
  taskFilters: IFilter[];
  typeFilters: IFilter[];
  licenseFilters: IFilter[];
  languageFilters: IFilter[];
  tagFilters: IFilter[];
  selectedFilters: Set<IFilter>;
  allowCollapse: boolean;
  updateSelectedFilters: typeof updateSelectedFilters;
}

const FilterBar: React.FC<IFilterBarProps> = (props) => {
  const {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    selectedFilters,
    tagFilters,
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
        <FilterBarOptions
          filters={tagFilters}
          label="Filter by Tag"
          allowCollapse={allowCollapse}
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={taskFilters}
          label="Filter by Task"
          allowCollapse={allowCollapse}
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={typeFilters}
          label="Filter by Type"
          allowCollapse={allowCollapse}
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={licenseFilters}
          label="Filter by License"
          allowCollapse={allowCollapse}
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={languageFilters}
          label="Filter by Language"
          allowCollapse={allowCollapse}
          addAction={handleFilterAddClick}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state: IAppState, ownProps: IFilterBarOwnProps) {
  const {
    filters: {
      tasks: taskFilters,
      types: typeFilters,
      licenses: licenseFilters,
      languages: languageFilters,
      tags: tagFilters,
      selected: selectedFilters,
    },
  } = state;

  const { allowCollapse } = ownProps;

  return {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    tagFilters,
    selectedFilters,
    allowCollapse: allowCollapse,
  };
}

const mapDispatchToProps = {
  updateSelectedFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
