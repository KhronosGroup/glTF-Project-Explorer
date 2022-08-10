import { Document } from "flexsearch";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { IProjectSearchDoc } from "../../interfaces/IAppState";
import { ProjectsActionTypes } from "./Types";
import { ISuccessfulProjectsAction, IFailedProjectsAction } from "./Interfaces";

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
