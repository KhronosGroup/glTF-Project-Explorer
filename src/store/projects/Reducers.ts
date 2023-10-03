import { IProjectsState } from "../../interfaces/IAppState";
import { ProjectsActions } from "./Interfaces";
import { ProjectsActionTypes } from "./Types";

export function projects(
  state: IProjectsState = {
    isFetchingProjects: false,
    values: [],
    isFetchingProjectsMetadata: false,
  },
  action: ProjectsActions
) {
  switch (action.type) {
    case ProjectsActionTypes.PROJECTS_REQUESTED:
      return { ...state, isFetchingProjects: true };
    case ProjectsActionTypes.PROJECTS_SUCCESSFUL:
      return {
        ...state,
        values: action.projects,
        searchIndex: action.searchIndex,
        isFetchingProjects: false,
      };
    case ProjectsActionTypes.PROJECTS_FAILED:
      return { ...state, isFetchingProjects: false };
    case ProjectsActionTypes.PROJECTS_METADATA_REQUESTED:
      return { ...state, isFetchingProjectsMetadata: true };
    case ProjectsActionTypes.PROJECTS_METADATA_SUCCESSFUL:
      return {
        ...state,
        projectsMetadata: action.projectsMetadata,
        isFetchingProjectsMetadata: false,
      };
    case ProjectsActionTypes.PROJECTS_METADATA_FAILED:
      return { ...state, isFetchingProjectsMetadata: false };

    default:
      return state;
  }
}
