import React, { useCallback } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateSelectedFilters } from "../store/filters/Actions";

export interface IFilterBarProps {
  taskFilters: IFilter[];
  typeFilters: IFilter[];
  licenseFilters: IFilter[];
  languageFilters: IFilter[];
  selectedFilters: IFilter[];
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

  const handleFilterTaskClick = useCallback(
    _ => {
      updateSelectedFilters([taskFilters[1]]);
    },
    [taskFilters, updateSelectedFilters]
  );

  const handleFilterTypeClick = useCallback(
    _ => {
      updateSelectedFilters([typeFilters[1]]);
    },
    [typeFilters, updateSelectedFilters]
  );

  const handleFilterLicenseClick = useCallback(
    _ => {
      updateSelectedFilters([licenseFilters[1]]);
    },
    [licenseFilters, updateSelectedFilters]
  );

  const handleFilterLanguageClick = useCallback(
    _ => {
      updateSelectedFilters([languageFilters[1]]);
    },
    [languageFilters, updateSelectedFilters]
  );

  const handleFilterResetClick = useCallback(
    _ => {
      updateSelectedFilters([]);
    },
    [updateSelectedFilters]
  );

  return (
    <div>
      This will be the filter bar.
      <button onClick={handleFilterTaskClick}>Filter by Task</button>
      <button onClick={handleFilterTypeClick}>Filter by Type</button>
      <button onClick={handleFilterLicenseClick}>Filter by License</button>
      <button onClick={handleFilterLanguageClick}>Filter by Language</button>
      <button onClick={handleFilterResetClick}>Clear Filters</button>
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
