import { call, takeEvery, put } from "redux-saga/effects";
import { fetchProjects } from "../../services/DataService";
import * as actions from "./Actions";
import { ProjectsActionTypes } from "./Types";

export function* retrieveProjects() {
  try {
    const projects = yield call(fetchProjects);
    yield put(actions.successfulProjects(projects));
  } catch (err) {
    yield put(actions.failedProjects(err));
  }
}

export function* updateProjects() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_REQUESTED, retrieveProjects);
}
