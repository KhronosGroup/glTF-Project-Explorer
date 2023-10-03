import { IProjectInfo } from "../interfaces/IProjectInfo";

interface IProjectCardHeader {
  project: IProjectInfo;
}

const ProjectCardHeader: React.FC<IProjectCardHeader> = (props) => {
  const { project } = props;

  const updateUrlBase = process.env.PROJECT_UPDATE_URL_BASE;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 className="m-0 text-2xl">
        {project.link ? <a className="external" href={project.link}>{project.name}</a> : project.name}
      </h1>
      {project.key && project.key.trim() !== "" && updateUrlBase && (
        <a
          className="bg-transparent !bg-none hover:bg-gltf-green font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded"
          href={updateUrlBase + project.key}
        >
          Update Project
        </a>
      )}
    </div>
  );
};

export default ProjectCardHeader;
