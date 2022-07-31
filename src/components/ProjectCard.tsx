import { IProjectInfo } from "../interfaces/IProjectInfo";
import ProjectDetailList from "./ProjectDetailList";
import ProjectCardHeader from "./ProjectCardHeader";
import "./ProjectCard.css";
import Markdown from "./Markdown";

const shouldShowSection = (items?: string[]) => items && items.length > 0;

interface IProjectCardProps {
  project: IProjectInfo;
}

const ProjectCard: React.FC<IProjectCardProps> = (props) => {
  const { project } = props;

  return (
    <div className="project-card m-4 rounded p-4 shadow-sharp transition ease-in-out hover:shadow-hover">
      <ProjectCardHeader project={project} />
      <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
        {project.description && (
          <Markdown
            className="break-words text-sm"
            body={project.description}
          />
        )}
        <div className="grid gap-4 md:grid-cols-3 lg:col-span-2 lg:grid-cols-4">
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
            <ProjectDetailList
              header="Output Methods"
              items={project.outputs}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
