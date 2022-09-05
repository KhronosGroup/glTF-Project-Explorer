import * as actions from "./Actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { Document } from "flexsearch";
import { fetchProjects } from "../../services/DataService";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { IProjectSearchDoc } from "../../interfaces/IAppState";
import { ProjectsActionTypes } from "./Types";

function* retrieveProjects() {
  try {
    const projects: IProjectInfo[] = yield call(fetchProjects);

    // This probably isn't the best way to do this, but should be okay. In practice we only ever call `retrieveProjects()`
    //   once, so we shouldn't be creating (and leaking) multiple Document indices in memory.
    const searchIndex = new Document<IProjectSearchDoc>({
      preset: "memory",
      tokenize: "full",
      document: {
        id: "id",
        index: ["name", "description"],
      },
    });

    projects.forEach((p) =>
      searchIndex.add({
        id: p.id,
        name: p.name,
        description: p.description,
      })
    );

    yield put(actions.successfulProjects(projects, searchIndex));
  } catch (err) {
    yield put(actions.failedProjects(err as Error));
  }
}

export function* updateProjects() {
  yield takeEvery(ProjectsActionTypes.PROJECTS_REQUESTED, retrieveProjects);
}
