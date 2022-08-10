import { IProjectInfo } from "../interfaces/IProjectInfo";

// Despite the data being a static file, we don't pull it in using Webpack so
//   we can change to using a restful service in the future.
function fetchProjectsInternal(): Promise<IProjectInfo[]> {
  return fetch(`${process.env.PUBLIC_URL}/data/glTF-projects-data.json`)
    .then((r) => r.json())
    .catch((error) => console.error(`Error fetching data. Reason: ${error}`));
}

/**
 * Converts the given project info into the new structure, where the
 * properties are stored in the `properties` record.
 *
 * TODO_GENERALIZATION This is a preliminary state. In the future,
 * the input JSON could be modified, or be represented by a structure
 * like "ILegacyProjectInfo" that is converted into the IProjectInfo
 * here.
 *
 * @param p The project info
 * @returns The given project info
 */
function migrateProjectInfoForGeneralization(p: IProjectInfo): IProjectInfo {
  p.properties = {};
  p.properties["task"] = p.task ? p.task : [];
  p.properties["license"] = p.license ? p.license : [];
  p.properties["type"] = p.type ? p.type : [];
  p.properties["language"] = p.language ? p.language : [];
  p.properties["inputs"] = p.inputs ? p.inputs : [];
  p.properties["outputs"] = p.outputs ? p.outputs : [];
  p.properties["tags"] = p.tags ? p.tags : [];
  return p;
}

export function fetchProjects(): Promise<IProjectInfo[]> {
  return new Promise(async (resolve) => {
    const projects = await fetchProjectsInternal();

    // This work gives us a stable key. Eventually when this is database
    // backed the ID will be provided by the DB and this can be removed.
    let id = 0;
    let resultProjects = projects.map((p) => {
      p.id = id++;
      return p;
    });
    resultProjects = resultProjects.map(migrateProjectInfoForGeneralization);
    resolve(resultProjects);
  });
}
