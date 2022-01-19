import { call, takeEvery, put } from "redux-saga/effects";
import { fetchProjects } from "../../services/DataService";
import * as actions from "./Actions";
import { ProjectsActionTypes } from "./Types";
import { IProjectInfo } from "../../interfaces/IProjectInfo";

export function* retrieveProjects() {
  try {
    const projects: IProjectInfo[] = yield call(fetchProjects);
    let id = 0;
    yield put(
      actions.successfulProjects(
        projects.map((p) => {
          // This work gives us a stable key. Eventually when this is database
          // backed the ID will be provided by the DB and this can be removed.
          p.id = id++;
          return p;
        })
      )
    );
  } catch (err) {
    yield put(actions.failedProjects(err as Error));
  }
}

export function* updateProjects() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_REQUESTED, retrieveProjects);
}
