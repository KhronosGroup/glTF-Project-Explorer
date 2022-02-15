import { IProjectInfo } from "../interfaces/IProjectInfo";

interface IProjectCardHeader {
  project: IProjectInfo;
}

const ProjectCardHeader: React.FC<IProjectCardHeader> = (props) => {
  const { project } = props;

  return (
    <h1 className="m-0 text-2xl">
      {project.link ? <a href={project.link}>{project.name}</a> : project.name}
    </h1>
  );
};

export default ProjectCardHeader;
