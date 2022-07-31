import { IFiltersState } from "../../interfaces/IAppState";
import { FilterActionTypes } from "./Types";
import { FiltersActions } from "./Interfaces";

export function filters(
  state: IFiltersState = {
    filterOptions: {},
    titleSubstring: "",
    selected: new Set(),
  },
  action: FiltersActions
) {
  switch (action.type) {
    case FilterActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filterOptions: action.filterOptions,
        titleSubstring: action.titleSubstring,
      };
    case FilterActionTypes.UPDATE_SELECTED_FILTERS:
      return {
        ...state,
        selected: action.selected,
      };
    case FilterActionTypes.UPDATE_TITLE_SUBSTRING_FILTER:
      return {
        ...state,
        titleSubstring: action.titleSubstring,
      };
    default:
      return state;
  }
}
