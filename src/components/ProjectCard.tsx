import React from "react";
import { IProjectInfo } from "../interfaces/IProjectInfo";
import ProjectDetailList from "./ProjectDetailList";

const shouldShowSection = (items?: string[]) => items && items.length > 0;

export interface IProjectCardProps {
  project: IProjectInfo;
}

const ProjectCard: React.FC<IProjectCardProps> = props => {
  const { project } = props;

  return (
    <div className="project-card">
      <h1>{project.name}</h1>
      {project.description && <p>{project.description}</p>}
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
        <ProjectDetailList header="Input Methods" items={project.type} />
      )}
      {shouldShowSection(project.outputs) && (
        <ProjectDetailList header="Output Methods" items={project.outputs} />
      )}
    </div>
  );
};

export default ProjectCard;
