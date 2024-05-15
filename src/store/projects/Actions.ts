import { Document } from "flexsearch";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { IProjectSearchDoc } from "../../interfaces/IAppState";
import { ProjectsActionTypes } from "./Types";
import { ISuccessfulProjectsAction, IFailedProjectsAction, ISuccessfulProjectsMetadataAction, IFailedProjectsMetadataAction } from "./Interfaces";
import { IProjectsMetadata } from "../../interfaces/IProjectsMetadata";

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

export function successfulProjectsMetadata(
  projectsMetadata: IProjectsMetadata
): ISuccessfulProjectsMetadataAction {
  return {
    type: ProjectsActionTypes.PROJECTS_METADATA_SUCCESSFUL,
    projectsMetadata: projectsMetadata,
  };
}

export function failedProjectsMetadata(error: Error): IFailedProjectsMetadataAction {
  return {
    type: ProjectsActionTypes.PROJECTS_METADATA_FAILED,
    error: error,
  };
}
