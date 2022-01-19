import { IProjectInfo } from "../interfaces/IProjectInfo";
import ProjectDetailList from "./ProjectDetailList";
import ProjectCardHeader from "./ProjectCardHeader";
import "./ProjectCard.css";
import Markdown from "./Markdown";

const shouldShowSection = (items?: string[]) => items && items.length > 0;

export interface IProjectCardProps {
  project: IProjectInfo;
}

const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  const { project } = props;

  return (
    <div className="project-card">
      <ProjectCardHeader project={project} />
      <div className="project-card-content">
        {project.description && (
          <Markdown
            className="project-card-description"
            body={project.description}
          />
        )}
        {shouldShowSection(project.task) && (
          <ProjectDetailList header="Task" items={project.task} />
        )}
        {shouldShowSection(project.license) && (
          <ProjectDetailList header="License" items={project.license} />
        )}
        {shouldShowSection(project.language) && (
          <ProjectDetailList
            header="Supported Languages"
            items={project.language!}
          />
        )}
        {shouldShowSection(project.type) && (
          <ProjectDetailList header="Type" items={project.type} />
        )}
        {shouldShowSection(project.inputs) && (
          <ProjectDetailList header="Input Methods" items={project.inputs} />
        )}
        {shouldShowSection(project.outputs) && (
          <ProjectDetailList header="Output Methods" items={project.outputs} />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
