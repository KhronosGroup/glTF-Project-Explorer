export interface IProjectDetailListProps {
  header: string;
  items?: string[];
}

const ProjectDetailList: React.FC<IProjectDetailListProps> = (props) => {
  const { header, items } = props;

  if (!items) {
    return null;
  }

  return (
    <div className="text-sm">
      <h2>{header}</h2>
      <ul className="list-disc pl-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailList;
