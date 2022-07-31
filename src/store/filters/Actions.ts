import {
  IUpdateFiltersAction,
  IUpdateSelectedFiltersAction,
  IUpdateTitleSubstringFilterAction,
} from "./Interfaces";
import { FilterActionTypes } from "./Types";
import { IFilter } from "../../interfaces/IFilter";

export function updateFilters(
  filterOptions: Record<string, string[]>,
  titleSubstring: string
): IUpdateFiltersAction {
  return {
    type: FilterActionTypes.UPDATE_FILTERS,
    filterOptions,
    titleSubstring,
  };
}

export function updateSelectedFilters(
  selected: Set<IFilter>
): IUpdateSelectedFiltersAction {
  // React needs a new Set each time.
  selected = new Set(selected);
  return {
    type: FilterActionTypes.UPDATE_SELECTED_FILTERS,
    selected,
  };
}

export function updateTitleSubstringFilter(
  titleSubstring: string
): IUpdateTitleSubstringFilterAction {
  return {
    type: FilterActionTypes.UPDATE_TITLE_SUBSTRING_FILTER,
    titleSubstring,
  };
}
