import { IFilter, FilterDimension } from "../interfaces/IFilter";

export const determineClassName = (filter: IFilter) => {
  switch (filter.dimension) {
    case FilterDimension.Type:
      return "type-filter";
    case FilterDimension.Task:
      return "task-filter";
    case FilterDimension.License:
      return "license-filter";
    case FilterDimension.Language:
      return "language-filter";
    case FilterDimension.Tags:
      return "tags-filter";
    default:
      return "";
  }
};
