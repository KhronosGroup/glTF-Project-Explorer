import { IProjectInfo } from "../interfaces/IProjectInfo";

// Despite the data being a static file, we don't pull it in using Webpack so
//   we can change to using a restful service in the future.
export function fetchProjects(): Promise<IProjectInfo[]> {
  return fetch(`${process.env.PUBLIC_URL}/data/glTF-projects-data.json`)
    .then((r) => r.json())
    .catch((error) => console.error(`Error fetching data. Reason: ${error}`));
}

export function fetchProjectsWithId(): Promise<IProjectInfo[]> {
  return new Promise(async (resolve) => {
    const projects = await fetchProjects();

    let id = 0;
    resolve(
      projects.map((p) => {
        // This work gives us a stable key. Eventually when this is database
        // backed the ID will be provided by the DB and this can be removed.
        p.id = id++;
        return p;
      })
    );
  });
}
