import React, { useCallback } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";
import FilterBarOptions from "./FilterBarOptions";

export interface IFilterBarProps {
  taskFilters: IFilter[];
  typeFilters: IFilter[];
  licenseFilters: IFilter[];
  languageFilters: IFilter[];
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
    updateSelectedFilters
  } = props;

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

  const displaySelectedFilters = Array.from(selectedFilters);

  return (
    <div className="filter-bar">
      {selectedFilters.size > 0 && (
        <div>
          <h1>Selected Filters</h1>
          <ul>
            {displaySelectedFilters.map(f => (
              <li key={f.value}>
                <button onClick={handleFilterRemoveClick(f)}>{f.value}</button>
              </li>
            ))}
          </ul>
          <button onClick={handleFilterResetClick}>Clear Filters</button>
        </div>
      )}
      <FilterBarOptions
        filters={taskFilters}
        label="Filter by Task"
        action={handleFilterAddClick}
      />
      <FilterBarOptions
        filters={typeFilters}
        label="Filter by Type"
        action={handleFilterAddClick}
      />
      <FilterBarOptions
        filters={licenseFilters}
        label="Filter by License"
        action={handleFilterAddClick}
      />
      <FilterBarOptions
        filters={languageFilters}
        label="Filter by Language"
        action={handleFilterAddClick}
      />
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
      selected: selectedFilters
    }
  } = state;

  return {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    selectedFilters
  };
}

const mapDispatchToProps = {
  updateSelectedFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
