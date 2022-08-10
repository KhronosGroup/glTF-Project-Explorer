import { takeEvery, select, put } from "redux-saga/effects";
import { createNewFilter, IFilter } from "../../interfaces/IFilter";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectFilterProperties } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "../projects/Types";
import * as projectSelectors from "../projects/Selectors";
import * as actions from "./Actions";

const DEFAULT_FULL_TEXT_TITLE_VALUE = "";

function calculateFiltersForProperty(
  projects: IProjectInfo[],
  propertyName: string
) {
  const tasks = [
    ...new Set(
      projects.flatMap((p) => p.properties[propertyName]).filter((x) => x)
    ),
  ] as string[];
  return tasks.map((t) => createNewFilter(propertyName, t));
}

function* calculateFilters(): any {
  const projects = yield select(projectSelectors.getProjects);

  const filterOptions = new Map<string, IFilter[]>();
  const filterProperties = Array.from(ProjectFilterProperties.keys());
  for (const propertyName of filterProperties) {
    const filters = calculateFiltersForProperty(projects, propertyName);
    const sortedFilters = filters.sort((f0, f1) =>
      f0.value.localeCompare(f1.value)
    );
    filterOptions.set(propertyName, sortedFilters);
  }
  yield put(
    actions.updateFilters(filterOptions, DEFAULT_FULL_TEXT_TITLE_VALUE)
  );
  yield put(actions.updateSelectedFilters(new Set()));
}

export function* watchForFilterRecalculate() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_SUCCESSFUL, calculateFilters);
}
