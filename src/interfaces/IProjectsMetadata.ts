
export interface IValueType {
  type: "string" | "url" | "date" | "markdown" | "number";
  isArray: boolean;
}

export interface IProjectsMetadata {
  name: IValueType;
  description: IValueType;
  link: IValueType;
  tags: Record<string, IValueType>;
  filterTags: string[]
}
