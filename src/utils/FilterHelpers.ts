import { IFilter } from "../interfaces/IFilter";

const NUM_FILTER_COLORS = 8; // As defined in tailwind.config.css
const filterTagNames: string[] = [];

export const determineClassName = (filter: IFilter) => {
  let index = filterTagNames.indexOf(filter.tagName);
  if (index < 0) {
    index = filterTagNames.length;
    filterTagNames.push(filter.tagName);
  }
  index %= NUM_FILTER_COLORS;
  return `filter-${index}`;
};
