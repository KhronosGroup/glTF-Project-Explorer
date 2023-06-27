import { IProjectInfo } from "../interfaces/IProjectInfo";
import { ILegacyProjectInfo } from "../interfaces/IProjectInfo";
import { IProjectsMetadata } from "../interfaces/IProjectsMetadata";

// Despite the data being a static file, we don't pull it in using Webpack so
//   we can change to using a restful service in the future.
async function fetchProjectsInternal(): Promise<ILegacyProjectInfo[]> {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/data/glTF-projects-data.json`
    );
    return response.json();
  } catch (error) {
    console.error(`Error fetching data. Reason: ${error}`);
    return [];
  }
}

/**
 * Converts the given legacy project info into the new structure, where the
 * properties are stored in the `tags` record.
 *
 * @param p The legacy project info
 * @returns The new project info
 */
function migrateProjectInfoForGeneralization(
  p: ILegacyProjectInfo
): IProjectInfo {
  const result: IProjectInfo = {
    id: p.id,
    name: p.name,
    description: p.description,
    link: p.link,
    tags: {},
  };
  if (p.task) {
    result.tags["task"] = p.task;
  }
  if (p.license) {
    result.tags["license"] = p.license;
  }
  if (p.type) {
    result.tags["type"] = p.type;
  }
  if (p.language) {
    result.tags["language"] = p.language;
  }
  if (p.inputs) {
    result.tags["inputs"] = p.inputs;
  }
  if (p.outputs) {
    result.tags["outputs"] = p.outputs;
  }
  if (p.tags) {
    result.tags["tags"] = p.tags;
  }
  return result;
}

export async function fetchProjects(): Promise<IProjectInfo[]> {
  const legacyProjects = await fetchProjectsInternal();

  // This work gives us a stable key. Eventually when this is database
  // backed the ID will be provided by the DB and this can be removed.
  let id = 0;
  let legacyProjectsWithId = legacyProjects.map((p) => {
    p.id = id++;
    return p;
  });
  const resultProjects = legacyProjectsWithId.map(
    migrateProjectInfoForGeneralization
  );
  return resultProjects;
}

async function fetchProjectsMetadata(): Promise<IProjectsMetadata | undefined> {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/data/glTF-projects-metadata.json`
    );
    return response.json();
  } catch (error) {
    console.error(`Error fetching data. Reason: ${error}`);
    return undefined;
  }
}
