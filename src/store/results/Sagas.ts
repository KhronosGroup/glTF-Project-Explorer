import * as actions from "./Actions";
import * as filterSelectors from "../filters/Selectors";
import * as projectSelectors from "../projects/Selectors";
import { all, debounce, put, select, takeEvery } from "redux-saga/effects";
import { Document } from "flexsearch";
import { FilterActionTypes } from "../filters/Types";
import { IFilter } from "../../interfaces/IFilter";
import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ProjectFilterTags } from "../../interfaces/IProjectsMetadata";
import { IProjectSearchDoc } from "../../interfaces/IAppState";

// Tags in these groups will be pulled to the top of the list.
//   Priority is given to tags with lower index values.
const tagPriority = ["Khronos Official"];
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

  const filterTagNames = Array.from(ProjectFilterTags.keys());
  const groupedFilters = Array.from(selectedFilters).reduce<IGroupedFilters>(
    (acc, curr) => {
      if (!acc[curr.tagName]) {
        acc[curr.tagName] = [];
      }

      acc[curr.tagName].push(curr);

      return acc;
    },
    {}
  );

  return projects.filter((project) => {
    let match = false;

    for (const tagName of filterTagNames) {
      if (!groupedFilters[tagName]) continue;

      match = groupedFilters[tagName].some((filter) => {
        if (project.tags[tagName]) {
          // Within the dimension we do an OR.
          
          // TODO_V2: Here, the type will have to be checked.
          // Right now, this assumes that the values are 
          // string arrays or single values
          const tagValue = project.tags[tagName];
          if (Array.isArray(tagValue)) {
            return tagValue.some((v: any) => v === filter.value);
          } else {
            return tagValue === filter.value;
          }
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

function applyIndexedSearch(
  projects: IProjectInfo[],
  index: Document<IProjectSearchDoc> | undefined,
  query: string
): IProjectInfo[] {
  if (!index || !query) {
    return projects;
  }

  const results = index
    .search(query, 1000)
    .flatMap((r) => r.result)
    .filter((r, i, arr) => arr.indexOf(r) === i)
    .sort();

  return projects.filter((p) => results.includes(p.id));
}

function sortResults(projects: IProjectInfo[]): IProjectInfo[] {
  const buckets: ResultsBuckets = {};

  for (const tag of tagPriority) {
    buckets[tag] = [];
  }

  buckets[UNTAGGED_KEY] = [];

  for (const project of projects) {
    const tags = project.tags["tags"];
    if (!tags) {
      buckets[UNTAGGED_KEY].push(project);
      continue;
    }

    for (const tag of tags) {
      if (buckets[tag]) {
        buckets[tag].push(project);
      } else {
        buckets[UNTAGGED_KEY].push(project);
      }
    }
  }

  const result = Object.entries(buckets).flatMap(([_, projects]) => {
    return projects.sort((a, b) => a.name.localeCompare(b.name));
  });

  return result;
}

function* applyFilters() {
  const [projects, searchIndex, selectedFilters, query]: [
    IProjectInfo[],
    Document<IProjectSearchDoc> | undefined,
    Set<IFilter>,
    string
  ] = yield all([
    select(projectSelectors.getProjects),
    select(projectSelectors.getSearchIndex),
    select(filterSelectors.getSelectedFilters),
    select(filterSelectors.getTitleSubstring),
  ]);

  const filteredResults = applyTagFilters(projects, selectedFilters);
  const searchedResults = applyIndexedSearch(
    filteredResults,
    searchIndex,
    query
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
