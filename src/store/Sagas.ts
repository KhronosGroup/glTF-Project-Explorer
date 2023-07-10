import { fork, put } from "redux-saga/effects";
import { updateProjects, updateProjectsMetadata } from "./projects/Sagas";
import { ProjectsActionTypes } from "./projects/Types";
import { watchForFilterRecalculate } from "./filters/Sagas";
import { watchForResultUpdates } from "./results/Sagas";

function* startup() {
  yield put({ type: ProjectsActionTypes.PROJECTS_METADATA_REQUESTED });
  yield put({ type: ProjectsActionTypes.PROJECTS_REQUESTED });
}

export default function* root() {
  yield fork(startup);
  yield fork(updateProjectsMetadata);
  yield fork(updateProjects);
  yield fork(watchForFilterRecalculate);
  yield fork(watchForResultUpdates);
}
