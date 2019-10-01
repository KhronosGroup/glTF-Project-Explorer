import { createSelector } from "reselect";
import { IAppState } from "../../interfaces/IAppState";

export const getFilters = (state: IAppState) => state.filters;

export const getSelectedFilters = createSelector(
  getFilters,
  filters => filters.selected
);
