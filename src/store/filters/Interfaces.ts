import { IFilter } from "../../interfaces/IFilter";
import { FilterActionTypes } from "./Types";

export type FiltersActions =
  | IUpdateFiltersAction
  | IUpdateSelectedFiltersAction
  | IUpdateTitleSubstringFilterAction;

export interface IUpdateFiltersAction {
  readonly type: FilterActionTypes.UPDATE_FILTERS;
  readonly tasks: IFilter[];
  readonly types: IFilter[];
  readonly languages: IFilter[];
  readonly licenses: IFilter[];
  readonly tags: IFilter[];
  readonly titleSubstring: string;
}

export interface IUpdateSelectedFiltersAction {
  readonly type: FilterActionTypes.UPDATE_SELECTED_FILTERS;
  readonly selected: Set<IFilter>;
}

export interface IUpdateTitleSubstringFilterAction {
  readonly type: FilterActionTypes.UPDATE_TITLE_SUBSTRING_FILTER;
  readonly titleSubstring: string;
}
