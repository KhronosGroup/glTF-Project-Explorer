import { connect } from "react-redux";
import { IAppState } from "../interfaces/IAppState";
import { IProjectInfo } from "../interfaces/IProjectInfo";
import { getProjectForDetailScreen } from "../store/detailScreen/Selectors";

export interface IProjectDetailProps {
  project?: IProjectInfo;
}

const ProjectDetail: React.FC<IProjectDetailProps> = (props) => {
  const { project } = props;

  return <></>;
};

function mapStateToProps(state: IAppState): IProjectDetailProps {
  return {
    project: getProjectForDetailScreen(state),
  };
}

export default connect(mapStateToProps)(ProjectDetail);
