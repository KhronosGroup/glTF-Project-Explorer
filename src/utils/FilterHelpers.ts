import { IFilter } from "../interfaces/IFilter";

export const determineClassName = (filter: IFilter) => {
  // TODO_GENERALIZATION This is this tailwind class name thingy, to be sorted out.
  // For now, we're lucky: The classes are just 'propertyName'+'-filter' ...
  return filter.propertyName+"-filter";
  /*
  switch (filter.propertyName) {
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
  */
};
