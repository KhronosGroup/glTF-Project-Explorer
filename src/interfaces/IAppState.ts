import { IProjectInfo } from "./IProjectInfo";
import { IFilter } from "./IFilter";

/**
 * The Projects state is the master list of all projects from the data file. The
 * values for this state should not be modified after the file is loaded unless
 * reloading the file.
 *
 * @property isFetchingProjects Indicates if we are currently fetching projects from the server.
 * @property values The list of projects.
 */
export interface IProjectsState {
  isFetchingProjects: boolean;
  values: IProjectInfo[];
}

export interface IFiltersState {
  tasks: IFilter[];
  types: IFilter[];
  languages: IFilter[];
  licenses: IFilter[];
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
