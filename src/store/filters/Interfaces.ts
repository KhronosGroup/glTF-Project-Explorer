import { IFilter } from "../../interfaces/IFilter";
import { FilterActionTypes } from "./Types";

export type FiltersActions =
  | IUpdateFiltersAction
  | IUpdateSelectedFiltersAction;

export interface IUpdateFiltersAction {
  readonly type: FilterActionTypes.UPDATE_FILTERS;
  readonly tasks: IFilter[];
  readonly types: IFilter[];
  readonly languages: IFilter[];
  readonly licenses: IFilter[];
}

export interface IUpdateSelectedFiltersAction {
  readonly type: FilterActionTypes.UPDATE_SELECTED_FILTERS;
  readonly selected: IFilter[];
}
