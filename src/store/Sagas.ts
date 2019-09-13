import { fork, put } from "redux-saga/effects";
import { updateProjects } from "./projects/Sagas";
import { ProjectsActionTypes } from "./projects/Types";

export function* startup() {
  yield put({ type: ProjectsActionTypes.PROJECTS_REQUESTED });
}

export default function* root() {
  yield fork(startup);
  yield fork(updateProjects);
}
