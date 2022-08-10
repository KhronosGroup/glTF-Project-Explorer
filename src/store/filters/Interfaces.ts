import { IFilter } from "../../interfaces/IFilter";
import { FilterActionTypes } from "./Types";

export type FiltersActions =
  | IUpdateFiltersAction
  | IUpdateSelectedFiltersAction
  | IUpdateTitleSubstringFilterAction;

/**
 * The action to update the filters. Despite the name, this should probably
 * only called ONCE (?). 
 * 
 * The `filterOptions` are in fact the options for the filters. It is a
 * map that maps ProjectProperties values (i.e. the keys of the
 * IProjectInfo#properties map) to the filters that have been created
 * for the respective property for ALL available projects. 
 * 
 * TODO_GENERALIZTION: Why is the titleSubstring here...?
 * 
 * TODO_GENERALIZATION (or beyond): It would be nice if the values
 * could be updated when a filter was selected. For example, when
 * the 'task' "export" was added as a 'selected' filter, then the
 * "export" entry should no longer be available in the filter options.
 *
 * @property type The type
 * @property filterOptions The filter options
 * @property titleSubstring The title substring
 */  
export interface IUpdateFiltersAction {
  readonly type: FilterActionTypes.UPDATE_FILTERS;
  readonly filterOptions: Map<string, IFilter[]>;
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
