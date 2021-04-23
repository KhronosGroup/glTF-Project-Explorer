import {
  IRequestProjectsAction,
  ISuccessfulProjectsAction,
  IFailedProjectsAction,
} from "./Interfaces";
import { ProjectsActionTypes } from "./Types";
import { IProjectInfo } from "../../interfaces/IProjectInfo";

export function requestProjects(): IRequestProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_REQUESTED,
  };
}

export function successfulProjects(
  projects: IProjectInfo[]
): ISuccessfulProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_SUCCESSFUL,
    projects,
  };
}

export function failedProjects(error: Error): IFailedProjectsAction {
  return {
    type: ProjectsActionTypes.PROJECTS_FAILED,
    error: error,
  };
}
