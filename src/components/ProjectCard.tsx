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
          {Object.keys(project.tags).map((propName) => {
            const items = project.tags[propName];
            return (
              shouldShowSection(items) && (
                <ProjectDetailList
                  key={propName}
                  header={`${propName}`}
                  items={items}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
