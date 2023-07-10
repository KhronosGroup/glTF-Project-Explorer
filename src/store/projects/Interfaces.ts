import { Document } from "flexsearch";
import { IProjectSearchDoc } from "../../interfaces/IAppState";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "./Types";
import { IProjectsMetadata } from "../../interfaces/IProjectsMetadata";

export type ProjectsActions =
  | IRequestProjectsAction
  | ISuccessfulProjectsAction
  | IFailedProjectsAction 
  | IRequestProjectsMetadataAction 
  | ISuccessfulProjectsMetadataAction
  | IFailedProjectsMetadataAction;

  interface IRequestProjectsAction {
    readonly type: ProjectsActionTypes.PROJECTS_REQUESTED;
  }
  
  export interface ISuccessfulProjectsAction {
    readonly type: ProjectsActionTypes.PROJECTS_SUCCESSFUL;
    readonly projects: IProjectInfo[];
    readonly searchIndex: Document<IProjectSearchDoc>;
  }
  
  export interface IFailedProjectsAction {
    readonly type: ProjectsActionTypes.PROJECTS_FAILED;
    readonly error: Error;
  }

  interface IRequestProjectsMetadataAction {
    readonly type: ProjectsActionTypes.PROJECTS_METADATA_REQUESTED;
  }
  
  export interface ISuccessfulProjectsMetadataAction {
    readonly type: ProjectsActionTypes.PROJECTS_METADATA_SUCCESSFUL;
    readonly projectsMetadata: IProjectsMetadata;
  }
  
  export interface IFailedProjectsMetadataAction {
    readonly type: ProjectsActionTypes.PROJECTS_METADATA_FAILED;
    readonly error: Error;
  }
  