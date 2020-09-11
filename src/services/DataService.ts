import { IProjectInfo } from "../interfaces/IProjectInfo";

// Despite the data being a static file, we don't pull it in using Webpack so
//   we can change to using a restful service in the future.
export function fetchProjects(): Promise<IProjectInfo[]> {
  return fetch(`${process.env.PUBLIC_URL}/data/glTF-projects-data.json`)
    .then(r => r.json())
    .catch(error => console.error(`Error fetching data. Reason: ${error}`));
}
