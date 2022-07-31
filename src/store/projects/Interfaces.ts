import { Document } from "flexsearch";
import { IProjectSearchDoc } from "../../interfaces/IAppState";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "./Types";

export type ProjectsActions =
  | IRequestProjectsAction
  | ISuccessfulProjectsAction
  | IFailedProjectsAction;

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
