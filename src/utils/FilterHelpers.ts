import { IFilter } from "../interfaces/IFilter";

const NUM_FILTER_COLORS = 8; // As defined in tailwind.config.css
const filterPropertyNames: string[] = [];

export const determineClassName = (filter: IFilter) => {
  let index = filterPropertyNames.indexOf(filter.propertyName);
  if (index < 0) {
    index = filterPropertyNames.length;
    filterPropertyNames.push(filter.propertyName);
  }
  index %= NUM_FILTER_COLORS;
  return `filter-${index}`;
};
