import React, { useCallback } from "react";
import { connect } from "react-redux";
import { IFilter } from "../interfaces/IFilter";
import { IAppState } from "../interfaces/IAppState";
import { updateFilters } from "../store/filters/Actions";

export interface IFilterBarProps {
  taskFilters: IFilter[];
  typeFilters: IFilter[];
  licenseFilters: IFilter[];
  languageFilters: IFilter[];
  updateFilters: typeof updateFilters;
}

const FilterBar: React.FC<IFilterBarProps> = props => {
  const {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters,
    updateFilters
  } = props;

  const handleFilterTaskClick = useCallback(
    _ => {
      taskFilters[1].selected = true;
      typeFilters.forEach(f => (f.selected = false));
      licenseFilters.forEach(f => (f.selected = false));
      languageFilters.forEach(f => (f.selected = false));
      updateFilters(taskFilters, typeFilters, licenseFilters, languageFilters);
    },
    [taskFilters, typeFilters, licenseFilters, languageFilters, updateFilters]
  );

  const handleFilterTypeClick = useCallback(
    _ => {
      taskFilters.forEach(f => (f.selected = false));
      typeFilters[1].selected = true;
      licenseFilters.forEach(f => (f.selected = false));
      languageFilters.forEach(f => (f.selected = false));
      updateFilters(taskFilters, typeFilters, licenseFilters, languageFilters);
    },
    [taskFilters, typeFilters, licenseFilters, languageFilters, updateFilters]
  );

  const handleFilterLicenseClick = useCallback(
    _ => {
      taskFilters.forEach(f => (f.selected = false));
      typeFilters.forEach(f => (f.selected = false));
      licenseFilters[1].selected = true;
      languageFilters.forEach(f => (f.selected = false));
      updateFilters(taskFilters, typeFilters, licenseFilters, languageFilters);
    },
    [taskFilters, typeFilters, licenseFilters, languageFilters, updateFilters]
  );

  const handleFilterLanguageClick = useCallback(
    _ => {
      taskFilters.forEach(f => (f.selected = false));
      typeFilters.forEach(f => (f.selected = false));
      licenseFilters.forEach(f => (f.selected = false));
      languageFilters[2].selected = true;
      updateFilters(taskFilters, typeFilters, licenseFilters, languageFilters);
    },
    [taskFilters, typeFilters, licenseFilters, languageFilters, updateFilters]
  );

  const handleFilterResetClick = useCallback(
    _ => {
      taskFilters.forEach(f => (f.selected = false));
      typeFilters.forEach(f => (f.selected = false));
      licenseFilters.forEach(f => (f.selected = false));
      languageFilters.forEach(f => (f.selected = false));
      updateFilters(taskFilters, typeFilters, licenseFilters, languageFilters);
    },
    [taskFilters, typeFilters, licenseFilters, languageFilters, updateFilters]
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
      languages: languageFilters
    }
  } = state;

  return {
    taskFilters,
    typeFilters,
    licenseFilters,
    languageFilters
  };
}

const mapDispatchToProps = {
  updateFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
