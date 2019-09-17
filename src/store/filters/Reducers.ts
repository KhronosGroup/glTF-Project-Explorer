import { IFiltersState } from "../../interfaces/IAppState";
import { FilterActionTypes } from "./Types";
import { FiltersActions } from "./Interfaces";

export function filters(
  state: IFiltersState = {
    tasks: [],
    types: [],
    licenses: [],
    languages: []
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
        languages: action.languages
      };
    default:
      return state;
  }
}
