import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "./Types";

export type ProjectsActions =
  | IRequestProjectsAction
  | ISuccessfulProjectsAction
  | IFailedProjectsAction;

export interface IRequestProjectsAction {
  readonly type: ProjectsActionTypes.PROJECTS_REQUESTED;
}

export interface ISuccessfulProjectsAction {
  readonly type: ProjectsActionTypes.PROJECTS_SUCCESSFUL;
  readonly projects: IProjectInfo[];
}

export interface IFailedProjectsAction {
  readonly type: ProjectsActionTypes.PROJECTS_FAILED;
  readonly error: Error;
}
