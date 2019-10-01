import { createSelector } from "reselect";
import { IAppState } from "../../interfaces/IAppState";

export const getFilters = (state: IAppState) => state.filters;

export const getSelectedFilters = createSelector(
  getFilters,
  filters => filters.selected
);

// export const getSelectedTaskFilters = createSelector(
//   getFilters,
//   filters => filters.tasks.filter(t => t.selected)
// );

// export const getSelectedTypeFilters = createSelector(
//   getFilters,
//   filters => filters.types.filter(t => t.selected)
// );

// export const getSelectedLanguageFilters = createSelector(
//   getFilters,
//   filters => filters.languages.filter(l => l.selected)
// );

// export const getSelectedLicenseFilters = createSelector(
//   getFilters,
//   filters => filters.licenses.filter(l => l.selected)
// );
