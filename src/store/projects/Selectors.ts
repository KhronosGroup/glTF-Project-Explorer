import { IAppState } from "../../interfaces/IAppState";

export const getProjects = (state: IAppState) => state.projects.values;
