import { takeEvery, all, put, select } from "redux-saga/effects";
import * as projectSelectors from "../projects/Selectors";
import * as filterSelectors from "../filters/Selectors";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import * as actions from "./Actions";
import { IFilter, FilterDimension } from "../../interfaces/IFilter";
import { FilterActionTypes } from "../filters/Types";

export function* applyFilters() {
  const [projects, selectedFilters]: [IProjectInfo[], Set<IFilter>] = yield all(
    [
      select(projectSelectors.getProjects),
      select(filterSelectors.getSelectedFilters)
    ]
  );

  if (selectedFilters.size < 1) {
    yield put(actions.storeResults(projects));
    return;
  }

  // TODO: This currently does an OR. Do we want to do an AND instead?
  const results = projects.filter(project =>
    Array.from(selectedFilters).some(filter => {
      switch (filter.dimension) {
        case FilterDimension.Type:
          if (project.type) {
            return project.type.findIndex(t => t === filter.value) > -1;
          } else return false;
        case FilterDimension.Task:
          if (project.task) {
            return project.task.findIndex(t => t === filter.value) > -1;
          } else return false;
        case FilterDimension.License:
          if (project.license) {
            return project.license.findIndex(l => l === filter.value) > -1;
          } else return false;
        case FilterDimension.Language:
          if (project.language) {
            return project.language.findIndex(l => l === filter.value) > -1;
          } else return false;
        default:
          return false;
      }
    })
  );

  yield put(actions.storeResults(results));
}

export function* watchForResultUpdates() {
  yield takeEvery(FilterActionTypes.UPDATE_SELECTED_FILTERS, applyFilters);
}
