import { takeEvery, all, put, select } from "redux-saga/effects";
import * as projectSelectors from "../projects/Selectors";
import * as filterSelectors from "../filters/Selectors";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import * as actions from "./Actions";
import { IFilter, FilterDimension } from "../../interfaces/IFilter";
import { FilterActionTypes } from "../filters/Types";

interface IGroupedFilters {
  [dimension: string]: IFilter[];
}

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

  const dimensions = Object.values(FilterDimension);
  const groupedFilters = Array.from(selectedFilters).reduce<IGroupedFilters>(
    (acc, curr) => {
      if (!acc[curr.dimension]) {
        acc[curr.dimension] = [];
      }

      acc[curr.dimension].push(curr);

      return acc;
    },
    {}
  );

  const results = projects.filter(project => {
    let match = false;

    for (const dimension of dimensions) {
      if (!groupedFilters[dimension]) continue;

      match = groupedFilters[dimension].some(filter => {
        if (project[dimension]) {
          // Within the dimension we do an OR.
          return project[dimension]!.some(v => v === filter.value);
        }

        return false;
      });

      // No matches for this dimension? Break and continue to the next once
      // since we need all dimensions to match for our AND.
      if (!match) break;
    }

    return match;
  });

  yield put(actions.storeResults(results));
}

export function* watchForResultUpdates() {
  yield takeEvery(FilterActionTypes.UPDATE_SELECTED_FILTERS, applyFilters);
}
