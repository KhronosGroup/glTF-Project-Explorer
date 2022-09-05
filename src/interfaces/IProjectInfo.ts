// Aliases as these are the four possible types of filters.
type ProjectTask = string;
type ProjectType = string;
type ProjectLanguage = string;
type ProjectLicense = string;
type ProjectTag = string;

/**
 * TODO_GENERALIZATION:
 *
 * The IProjectInfo COULD already be an entity description generated
 * using https://github.com/typeorm/typeorm, but
 * - we don't know yet how persistence will be implemented
 * - the entities have to be dynamic in terms of the "columns"
 * But instances of the IProjectInfo could probably be mapped to
 * actual TypeORM entities in the persistence layer, while
 * the UI solely operates on the IProjectInfo.
 *
 * The ProjectProperties and ProjectFilterProperties are the
 * point of configuration for different project types. For now
 * they are hard-coded here.
 */

/**
 * The set of keys for the IProjectInfo#properties map
 */
export const ProjectProperties: Set<string> = new Set<string>([
  "task",
  "license",
  "type",
  "language",
  "inputs",
  "outputs",
  "tags",
]);

/**
 * A map defining the ProjectProperties by which the projects
 * can be filtered. The keys are the ProjectProperties elements.
 * The values are the string for the UI.
 */
export const ProjectFilterProperties = new Map<string, string>([
  ["tags", "Tags"],
  ["task", "Task"],
  ["type", "Type"],
  ["language", "Language"],
  ["license", "License"],
]);

export interface IProjectInfo {
  id: number;
  name: string;
  description?: string;
  link?: string;

  properties: Record<string, string[]>;

  // TODO_GENERALIZATION These are supposed to be removed.
  // Right now, they are "migrated" and written into the
  // "properties" record in the DataService.ts
  task?: ProjectTask[];
  license?: ProjectLicense[];
  type?: ProjectType[];
  language?: ProjectLanguage[];
  inputs?: string[];
  outputs?: string[];
  tags?: ProjectTag[];
}
