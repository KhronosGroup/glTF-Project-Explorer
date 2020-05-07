import { IFiltersState } from "../../interfaces/IAppState";
import { FilterActionTypes } from "./Types";
import { FiltersActions } from "./Interfaces";

export function filters(
  state: IFiltersState = {
    tasks: [],
    types: [],
    licenses: [],
    languages: [],
    tags: [],
    titleSubstring: "",
    selected: new Set()
  },
  action: FiltersActions
) {
  switch (action.type) {
    case FilterActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        tasks: action.tasks,
        types: action.types,
        licenses: action.licenses,
        languages: action.languages,
        tags: action.tags,
        titleSubstring: action.titleSubstring
      };
    case FilterActionTypes.UPDATE_SELECTED_FILTERS:
      return {
        ...state,
        selected: action.selected
      };
    case FilterActionTypes.UPDATE_TITLE_SUBSTRING_FILTER:
      return {
        ...state,
        titleSubstring: action.titleSubstring
      };
    default:
      return state;
  }
}
