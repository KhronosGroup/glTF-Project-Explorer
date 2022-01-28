import { IAppState } from "../../interfaces/IAppState";

export const getProjects = (state: IAppState) => state.projects.values;

export const getSearchIndex = (state: IAppState) => state.projects.searchIndex;
