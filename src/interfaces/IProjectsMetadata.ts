/**
 * The map of keys for the IProjectInfo#properties map,
 * mapped to a human-readable form that is shown in the UI
 */
export const ProjectTags = new Map<string, string>([
  ["tags", "Tags"],
  ["task", "Task"],
  ["license", "License"],
  ["type", "Type"],
  ["language", "Language"],
  ["inputs", "Inputs"],
  ["outputs", "Outputs"],
]);

/**
 * A map defining the ProjectTags by which the projects
 * can be filtered, which is a subset of the ProjectTags 
 */
export const ProjectFilterTags = new Map<string, string>([
  ["tags", "Tags"],
  ["task", "Task"],
  ["type", "Type"],
  ["language", "Language"],
  ["license", "License"],
]);

export interface IValueType
{
  type:  "string" | "url" | "date" | "markdown" | "number"
  isArray: boolean
}

export interface IProjectsMetadata {

  name: IValueType;
  description: IValueType;
  link: IValueType;
  tags: Record<string, IValueType>;
}
