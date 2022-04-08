import { createSelector } from "reselect";
import { IAppState } from "../../interfaces/IAppState";
import { getProjects } from "../projects/Selectors";

export const getDetailScreenId = (state: IAppState) =>
  state.detailScreen.projectId;

export const getProjectForDetailScreen = createSelector(
  getProjects,
  getDetailScreenId,
  (projects, detailScreenId) => {
    if (!detailScreenId) return undefined;

    return projects.find((p) => p.id === detailScreenId);
  }
);
