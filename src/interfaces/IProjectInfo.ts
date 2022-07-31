// Aliases as these are the four possible types of filters.
export type ProjectTask = string;
export type ProjectType = string;
export type ProjectLanguage = string;
export type ProjectLicense = string;
export type ProjectTag = string;
export type ProjectExtension = string;

/**
 * This COULD already be an entity description generated using
 * https://github.com/typeorm/typeorm, but 
 * - we don't know yet how persistence will be implemented
 * - the entities have to be dynamic in terms of the "columns"
 * Instances of this class could probably be mapped to
 * actual TypeORM entities in the persistence layer, while
 * the UI solely operates on the IProjectInfo.
 */

export interface IProjectInfo {
  id: number;
  name: string;
  description?: string;
  link?: string;

  properties: Record<string, string[]>;

  task?: ProjectTask[];
  license?: ProjectLicense[];
  type?: ProjectType[];
  language?: ProjectLanguage[];
  inputs?: string[];
  outputs?: string[];
  tags?: ProjectTag[];
}
