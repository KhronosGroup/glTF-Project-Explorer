import React from "react";
import { connect } from "react-redux";
import { IProjectInfo } from "../interfaces/IProjectInfo";
import { IAppState } from "../interfaces/IAppState";
import ProjectCard from "./ProjectCard";

export interface IProjectListProps {
  projects: IProjectInfo[];
}

const ProjectList: React.FC<IProjectListProps> = props => {
  const { projects } = props;

  return (
    <>
      <ul>
        {projects && projects.map(p => <ProjectCard project={p} key={p.id} />)}
      </ul>
    </>
  );
};

function mapStateToProps(state: IAppState): IProjectListProps {
  const {
    results: { values: projects }
  } = state;

  return { projects };
}

export default connect(mapStateToProps)(ProjectList);
