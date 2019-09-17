// Aliases as these are the four possible types of filters.
export type ProjectTask = string;
export type ProjectType = string;
export type ProjectLanguage = string;
export type ProjectLicense = string;

export interface IProjectInfo {
  name: string;
  description?: string;
  link?: string;
  task?: ProjectTask[];
  license?: ProjectLicense[];
  type?: ProjectType[];
  language?: ProjectLanguage[];
  inputs?: string[];
  outputs?: string[];
}
