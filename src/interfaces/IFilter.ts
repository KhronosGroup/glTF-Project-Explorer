export enum FilterDimension {
  Task = "task",
  Type = "type",
  License = "license",
  Language = "language",
  Tags = "tags"
}

export interface IFilter {
  dimension: FilterDimension;
  value: string;
  // selected: boolean;
}

export function createNewFilter(
  dimension: FilterDimension,
  value: string
): IFilter {
  return {
    dimension,
    value
    // selected: false
  };
}
