import { connect } from "react-redux";
import { IProjectInfo } from "../interfaces/IProjectInfo";
import { IAppState } from "../interfaces/IAppState";
import ProjectCard from "./ProjectCard";

interface IProjectListProps {
  projects: IProjectInfo[];
}

const ProjectList: React.FC<IProjectListProps> = (props) => {
  const { projects } = props;
  return (
    <>
      {projects && projects.map((p) => <ProjectCard project={p} key={p.id} />)}
    </>
  );
};

function mapStateToProps(state: IAppState): IProjectListProps {
  const {
    results: { values: projects },
  } = state;

  return { projects };
}

export default connect(mapStateToProps)(ProjectList);
