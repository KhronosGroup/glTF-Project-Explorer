export interface IFilter {
  propertyName: string;
  value: string;
  // selected: boolean;
}

export function createNewFilter(propertyName: string, value: string): IFilter {
  return {
    propertyName,
    value,
    // selected: false
  };
}
