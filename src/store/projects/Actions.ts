import {
  IRequestProjectsAction,
  ISuccessfulProjectsAction,
  IFailedProjectsAction,
} from "./Interfaces";
import { ProjectsActionTypes } from "./Types";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { Document } from "flexsearch";
import { IProjectSearchDoc } from "../../interfaces/IAppState";

export function requestProjects(): IRequestProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_REQUESTED,
  };
}

export function successfulProjects(
  projects: IProjectInfo[],
  searchIndex: Document<IProjectSearchDoc>
): ISuccessfulProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_SUCCESSFUL,
    projects,
    searchIndex,
  };
}

export function failedProjects(error: Error): IFailedProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_FAILED,
    error: error,
  };
}
