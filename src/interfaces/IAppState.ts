import { Document } from "flexsearch";
import { IFilter } from "./IFilter";
import { IProjectInfo } from "./IProjectInfo";

/**
 * This is the document layout used for indexing the Projects.
 */
export interface IProjectSearchDoc {
  id: number;
  name: string;
  description?: string;
}

/**
 * The Projects state is the master list of all projects from the data file. The
 * values for this state should not be modified after the file is loaded unless
 * reloading the file.
 *
 * @property isFetchingProjects Indicates if we are currently fetching projects from the server.
 * @property values The list of projects.
 * @property searchIndex The flexsearch index for searching titles and descriptions.
 */
export interface IProjectsState {
  isFetchingProjects: boolean;
  values: IProjectInfo[];
  searchIndex?: Document<IProjectSearchDoc>;
}

/**
 * The part of the state that summarizes the filter options and selection.
 *
 * @property filterOptions A record that maps ProjectProperties values to the
 * list of filters that are available for this project property. These are
 * one filter object for each possible value of this property.
 * @property titleSubstring The string that was entered in the free-text search box
 * @property selected The set of filters that are currently selected
 */
 export interface IFiltersState {
  filterOptions: Record<string, IFilter[]>;
  titleSubstring: string;
  selected: Set<IFilter>;
}

/**
 * Results are the IProjectInfo objects that are displayed to the user after
 * filtering has been applied.
 *
 * @property values The filtered list of projects.
 */
export interface IResultsState {
  values: IProjectInfo[];
}

export interface IAppState {
  projects: IProjectsState;
  filters: IFiltersState;
  results: IResultsState;
}
