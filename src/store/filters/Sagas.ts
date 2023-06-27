import { takeEvery, select, put } from "redux-saga/effects";
import { createNewFilter, IFilter } from "../../interfaces/IFilter";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectFilterTags } from "../../interfaces/IProjectsMetadata";
import { ProjectsActionTypes } from "../projects/Types";
import * as projectSelectors from "../projects/Selectors";
import * as actions from "./Actions";

const DEFAULT_FULL_TEXT_TITLE_VALUE = "";

function calculateFiltersForTag(projects: IProjectInfo[], tagName: string) {
  const tasks = [
    ...new Set(projects.flatMap((p) => p.tags[tagName]).filter((x) => x)),
  ] as string[];
  return tasks.map((t) => createNewFilter(tagName, t));
}

function* calculateFilters(): any {
  const projects = yield select(projectSelectors.getProjects);

  const filterOptions = new Map<string, IFilter[]>();
  const filterTags = Array.from(ProjectFilterTags.keys());
  for (const tagName of filterTags) {
    const filters = calculateFiltersForTag(projects, tagName);
    const sortedFilters = filters.sort((f0, f1) =>
      f0.value.localeCompare(f1.value)
    );
    filterOptions.set(tagName, sortedFilters);
  }
  yield put(
    actions.updateFilters(filterOptions, DEFAULT_FULL_TEXT_TITLE_VALUE)
  );
  yield put(actions.updateSelectedFilters(new Set()));
}

export function* watchForFilterRecalculate() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_SUCCESSFUL, calculateFilters);
}
