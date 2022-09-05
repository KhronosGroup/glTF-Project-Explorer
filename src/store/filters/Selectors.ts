import { createSelector } from "reselect";
import { IAppState } from "../../interfaces/IAppState";

const getFilters = (state: IAppState) => state.filters;

export const getSelectedFilters = createSelector(
  getFilters,
  (filters) => filters.selected
);

export const getTitleSubstring = createSelector(
  getFilters,
  (filters) => filters.titleSubstring
);
