import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";
import FilterBarOptions from "./FilterBarOptions";
import "./FilterBar.css";
import FilterBarSelected from "./FilterBarSelected";

export interface IFilterBarProps {
  taskFilters: IFilter[];
  typeFilters: IFilter[];
  licenseFilters: IFilter[];
  languageFilters: IFilter[];
  tagFilters: IFilter[];
  selectedFilters: Set<IFilter>;
  updateSelectedFilters: typeof updateSelectedFilters;
}

const FilterBar: React.FC<IFilterBarProps> = props => {
  const {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    selectedFilters,
    tagFilters,
    updateSelectedFilters
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

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
    _ => {
      selectedFilters.clear();
      updateSelectedFilters(selectedFilters);
    },
    [selectedFilters, updateSelectedFilters]
  );

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <h1 onClick={toggleVisibility}>
          Filter Results {isVisible ? "▲" : "▼"}
        </h1>
      </div>
      <div className={isVisible ? "filter-bar-expando" : "hide"}>
        <FilterBarSelected
          selectedFilters={selectedFilters}
          removeAction={handleFilterRemoveClick}
          resetAction={handleFilterResetClick}
        />
        <FilterBarOptions
          filters={tagFilters}
          label="Filter by Tag"
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={taskFilters}
          label="Filter by Task"
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={typeFilters}
          label="Filter by Type"
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={licenseFilters}
          label="Filter by License"
          addAction={handleFilterAddClick}
        />
        <FilterBarOptions
          filters={languageFilters}
          label="Filter by Language"
          addAction={handleFilterAddClick}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state: IAppState) {
  const {
    filters: {
      tasks: taskFilters,
      types: typeFilters,
      licenses: licenseFilters,
      languages: languageFilters,
      tags: tagFilters,
      selected: selectedFilters
    }
  } = state;

  return {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    tagFilters,
    selectedFilters
  };
}

const mapDispatchToProps = {
  updateSelectedFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
