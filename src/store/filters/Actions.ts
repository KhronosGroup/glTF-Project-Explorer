import { IUpdateFiltersAction } from "./Interfaces";
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
