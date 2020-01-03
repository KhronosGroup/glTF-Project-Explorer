import { takeEvery, all, put, select, debounce } from "redux-saga/effects";
import * as projectSelectors from "../projects/Selectors";
import * as filterSelectors from "../filters/Selectors";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import * as actions from "./Actions";
import { IFilter, FilterDimension } from "../../interfaces/IFilter";
import { FilterActionTypes } from "../filters/Types";

// Tags in these groups will be pulled to the top of the list.
//   Priority is given to tags with lower index values.
const tagPriority = ["Khronos Official", "Staff Picks"];
const UNTAGGED_KEY = "UNTAGGED";

type ResultsBuckets = { [key: string]: IProjectInfo[] };

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
  const titleSubstringLowerCase = titleSubstring.toLowerCase();
  return projects.filter(p =>
    p.name.toLowerCase().includes(titleSubstringLowerCase)
  );
}

function sortResults(projects: IProjectInfo[]): IProjectInfo[] {
  const buckets: ResultsBuckets = {};

  for (const tag of tagPriority) {
    buckets[tag] = [];
  }

  buckets[UNTAGGED_KEY] = [];

  for (const project of projects) {
    if (!project.tags) {
      buckets[UNTAGGED_KEY].push(project);
      continue;
    }

    for (const tag of project.tags) {
      if (buckets[tag]) {
        buckets[tag].push(project);
      } else {
        buckets[UNTAGGED_KEY].push(project);
      }
    }
  }

  return Object.entries(buckets).flatMap(([_, projects]) => {
    return projects.sort((a, b) => a.name.localeCompare(b.name));
  });
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

  const filteredResults = applyTagFilters(projects, selectedFilters);
  const searchedResults = applyTitleSearchFilter(
    filteredResults,
    titleSubstring
  );
  const results = sortResults(searchedResults);

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
