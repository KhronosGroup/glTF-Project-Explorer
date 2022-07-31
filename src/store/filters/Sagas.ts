import { takeEvery, all, call, select, put } from "redux-saga/effects";
import { createNewFilter } from "../../interfaces/IFilter";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectProperties } from "../../interfaces/IProjectInfo";
import { ProjectFilterProperties } from "../../interfaces/IProjectInfo";
import { ProjectsActionTypes } from "../projects/Types";
import * as projectSelectors from "../projects/Selectors";
import * as actions from "./Actions";

const DEFAULT_FULL_TEXT_TITLE_VALUE = "";

function calculateFilterStrings(projects: IProjectInfo[], propertyName : string) {
  const tasks = [
    ...new Set(projects.flatMap((p) => p.properties[propertyName]).filter((x) => x)),
  ] as string[];
  return tasks.map((t) => createNewFilter(propertyName, t));
}

function* calculateFilters(): any {
  const projects = yield select(projectSelectors.getProjects);

  // TODO_GENERALIZATION: The strings here should be the ProjectFilterProperties keys.
  // Figure out how to do this "yield-all" thingy to directly create a record....
  const filters = yield all([
    call(calculateFilterStrings, projects, "tags"),
    call(calculateFilterStrings, projects, "task"),
    call(calculateFilterStrings, projects, "type"),
    call(calculateFilterStrings, projects, "license"),
    call(calculateFilterStrings, projects, "language"),
  ]);

  const filterOptions : Record<string, string[]> = {
    "tags" : filters[0],
    "task" : filters[1],
    "type" : filters[2],
    "license" : filters[3],
    "language" : filters[4],
  }
  yield put(
    actions.updateFilters(
      filterOptions,
      DEFAULT_FULL_TEXT_TITLE_VALUE
    )
  );
  yield put(actions.updateSelectedFilters(new Set()));
}

export function* watchForFilterRecalculate() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_SUCCESSFUL, calculateFilters);
}
