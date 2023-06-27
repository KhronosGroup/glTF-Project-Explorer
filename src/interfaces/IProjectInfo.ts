export interface IProjectInfo {
  id: number;
  name: string;
  description?: string;
  link?: string;

  tags: Record<string, any>;
}

export interface ILegacyProjectInfo {
  id: number;
  name: string;
  description?: string;
  link?: string;
  task?: string[];
  license?: string[];
  type?: string[];
  language?: string[];
  inputs?: string[];
  outputs?: string[];
  tags?: string[];
}
