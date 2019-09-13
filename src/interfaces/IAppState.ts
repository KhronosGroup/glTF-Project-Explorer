import { IProjectInfo } from "./IProjectInfo";

export interface IProjectsState {
  isFetchingProjects: boolean;
  values: IProjectInfo[];
}

export interface IAppState {
  projects: IProjectsState;
}
