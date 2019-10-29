import { takeEvery, all, put, select, debounce } from "redux-saga/effects";
import * as projectSelectors from "../projects/Selectors";
import * as filterSelectors from "../filters/Selectors";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import * as actions from "./Actions";
import { IFilter, FilterDimension } from "../../interfaces/IFilter";
import { FilterActionTypes } from "../filters/Types";

interface IGroupedFilters {
  [dimension: string]: IFilter[];
}

function applyTagFilters(
  projects: IProjectInfo[],
  selectedFilters: Set<IFilter>
): IProjectInfo[] {
  if (selectedFilters.size < 1) {
    return projects;
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

  return projects.filter(project => {
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
}

function applyTitleSearchFilter(
  projects: IProjectInfo[],
  titleSubstring?: string
): IProjectInfo[] {
  if (!titleSubstring) {
    return projects;
  }

  return projects.filter(p => p.name.includes(titleSubstring));
}

export function* applyFilters() {
  const [projects, selectedFilters, titleSubstring]: [
    IProjectInfo[],
    Set<IFilter>,
    string
  ] = yield all([
    select(projectSelectors.getProjects),
    select(filterSelectors.getSelectedFilters),
    select(filterSelectors.getTitleSubstring)
  ]);

  const interimResults = applyTagFilters(projects, selectedFilters);
  const results = applyTitleSearchFilter(interimResults, titleSubstring);

  yield put(actions.storeResults(results));
}

export function* watchForResultUpdates() {
  yield takeEvery(FilterActionTypes.UPDATE_SELECTED_FILTERS, applyFilters);
  yield debounce(
    500,
    FilterActionTypes.UPDATE_TITLE_SUBSTRING_FILTER,
    applyFilters
  );
}
