import React from "react";
import { IFilter } from "../interfaces/IFilter";

export interface IFilterBarOptionsProps {
  filters: IFilter[];
  label: string;
  action: (f: IFilter) => (_: React.MouseEvent) => void;
}

const FilterBarOptions: React.FC<IFilterBarOptionsProps> = props => {
  const { filters, label, action } = props;

  return (
    <>
      {filters.length > 0 && (
        <div className="filter-bar-options">
          <h1>{label}</h1>
          <ul>
            {filters.map(f => (
              <li key={f.value}>
                <button onClick={action(f)}>{f.value}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FilterBarOptions;
