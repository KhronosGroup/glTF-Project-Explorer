import React from "react";
import { IProjectInfo } from "../interfaces/IProjectInfo";

export interface IFilterBarProps {
  projects: IProjectInfo[];
}

const FilterBar: React.FC<IFilterBarProps> = props => {
  return <div>This will be the filter bar.</div>;
};

// TODO: Connect the filter bar.

export default FilterBar;
