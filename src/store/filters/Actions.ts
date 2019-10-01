import {
  IUpdateFiltersAction,
  IUpdateSelectedFiltersAction
} from "./Interfaces";
import { FilterActionTypes } from "./Types";
import { IFilter } from "../../interfaces/IFilter";

export function updateFilters(
  tasks: IFilter[],
  types: IFilter[],
  licenses: IFilter[],
  languages: IFilter[]
): IUpdateFiltersAction {
  return {
    type: FilterActionTypes.UPDATE_FILTERS,
    tasks,
    types,
    licenses,
    languages
  };
}

export function updateSelectedFilters(
  selected: Set<IFilter>
): IUpdateSelectedFiltersAction {
  // React needs a new Set each time.
  selected = new Set(selected);
  return {
    type: FilterActionTypes.UPDATE_SELECTED_FILTERS,
    selected
  };
}
