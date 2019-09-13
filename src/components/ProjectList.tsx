import React from "react";
import { connect } from "react-redux";
import { IProjectInfo } from "../interfaces/IProjectInfo";
import { IAppState } from "../interfaces/IAppState";

export interface IProjectListProps {
  projects: IProjectInfo[];
}

const ProjectList: React.FC<IProjectListProps> = props => {
  const { projects } = props;

  return (
    <>
      <ul>
        {projects &&
          projects.map(p => <li key={`${p.name}_${p.link}`}>{p.name}</li>)}
      </ul>
    </>
  );
};

function mapStateToProps(state: IAppState): IProjectListProps {
  const {
    projects: { values: projects }
  } = state;

  return { projects };
}

export default connect(mapStateToProps)(ProjectList);
