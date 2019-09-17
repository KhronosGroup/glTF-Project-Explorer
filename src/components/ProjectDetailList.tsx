import React from "react";

export interface IProjectDetailListProps {
  header: string;
  items?: string[];
}

const ProjectDetailList: React.FC<IProjectDetailListProps> = props => {
  const { header, items } = props;

  if (!items) {
    return null;
  }

  return (
    <div className="project-card-details">
      <h2>{header}</h2>
      <ul>
        {items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailList;
