export interface IFilter {
  tagName: string;
  value: string;
}

export function createNewFilter(tagName: string, value: string): IFilter {
  return {
    tagName,
    value,
  };
}
