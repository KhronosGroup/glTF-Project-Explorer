import { takeEvery, all, call, select, put } from "redux-saga/effects";
import { createNewFilter, FilterDimension } from "../../interfaces/IFilter";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "../projects/Types";
import * as projectSelectors from "../projects/Selectors";
import * as actions from "./Actions";

const DEFAULT_FULL_TEXT_TITLE_VALUE = "";

function calculateTaskFilters(projects: IProjectInfo[]) {
  const tasks = [
    ...new Set(projects.flatMap((p) => p.task).filter((x) => x)),
  ] as string[]; // We know we have no undefined or blank values.
  return tasks.map((t) => createNewFilter(FilterDimension.Task, t));
}

function calculateTypeFilters(projects: IProjectInfo[]) {
  const types = [
    ...new Set(projects.flatMap((p) => p.type).filter((x) => x)),
  ] as string[];
  return types.map((t) => createNewFilter(FilterDimension.Type, t));
}

function calculateLicenseFilters(projects: IProjectInfo[]) {
  const licenses = [
    ...new Set(projects.flatMap((p) => p.license).filter((x) => x)),
  ] as string[];
  return licenses.map((l) => createNewFilter(FilterDimension.License, l));
}

function calculateLanguageFilters(projects: IProjectInfo[]) {
  const languages = [
    ...new Set(projects.flatMap((p) => p.language).filter((x) => x)),
  ] as string[];
  return languages.map((l) => createNewFilter(FilterDimension.Language, l));
}

function calculateTagFilters(projects: IProjectInfo[]) {
  const tags = [
    ...new Set(projects.flatMap((p) => p.tags).filter((x) => x)),
  ] as string[];
  return tags.map((t) => createNewFilter(FilterDimension.Tags, t));
}

function* calculateFilters(): any {
  const projects = yield select(projectSelectors.getProjects);
  const [tasks, types, licenses, languages, tags] = yield all([
    call(calculateTaskFilters, projects),
    call(calculateTypeFilters, projects),
    call(calculateLicenseFilters, projects),
    call(calculateLanguageFilters, projects),
    call(calculateTagFilters, projects),
  ]);
  yield put(
    actions.updateFilters(
      tasks,
      types,
      licenses,
      languages,
      tags,
      DEFAULT_FULL_TEXT_TITLE_VALUE
    )
  );
  yield put(actions.updateSelectedFilters(new Set()));
}

export function* watchForFilterRecalculate() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_SUCCESSFUL, calculateFilters);
}
