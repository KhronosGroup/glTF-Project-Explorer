import { takeEvery, all, put, select } from "redux-saga/effects";
import * as projectSelectors from "../projects/Selectors";
import * as filterSelectors from "../filters/Selectors";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import * as actions from "./Actions";
import { IFilter } from "../../interfaces/IFilter";
import { FilterActionTypes } from "../filters/Types";

export function* applyFilters() {
  const [
    projects,
    taskFilters,
    typeFilters,
    languageFilters,
    licenseFilters
  ] = yield all([
    select(projectSelectors.getProjects),
    select(filterSelectors.getSelectedTaskFilters),
    select(filterSelectors.getSelectedTypeFilters),
    select(filterSelectors.getSelectedLanguageFilters),
    select(filterSelectors.getSelectedLicenseFilters)
  ]);

  if (
    taskFilters.length < 1 &&
    typeFilters.length < 1 &&
    languageFilters.length < 1 &&
    licenseFilters.length < 1
  ) {
    yield put(actions.storeResults(projects));
    return;
  }

  const results = (projects as IProjectInfo[]).filter(p => {
    if (p.task) {
      for (const filter of taskFilters as IFilter[]) {
        if (p.task.find(e => e === filter.value)) {
          return true;
        }
      }
    }

    if (p.type) {
      for (const filter of typeFilters) {
        if (p.type.find(e => e === filter.value)) {
          return true;
        }
      }
    }

    if (p.language) {
      for (const filter of languageFilters) {
        if (p.language.find(e => e === filter.value)) {
          return true;
        }
      }
    }

    if (p.license) {
      for (const filter of licenseFilters) {
        if (p.license.find(e => e === filter.value)) {
          return true;
        }
      }
    }

    return false;
  });

  yield put(actions.storeResults(results));
}

export function* watchForResultUpdates() {
  yield takeEvery(FilterActionTypes.UPDATE_FILTERS, applyFilters);
}
