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
  selected: IFilter[]
): IUpdateSelectedFiltersAction {
  return {
    type: FilterActionTypes.UPDATE_SELECTED_FILTERS,
    selected
  };
}
