import React, { useState, useCallback } from "react";
import { IFilter } from "../interfaces/IFilter";
import { determineClassName } from "../utils/FilterHelpers";
import "./FilterBarOptions.css";

export interface IFilterBarOptionsProps {
  filters: IFilter[];
  label: string;
  addAction: (f: IFilter) => (_: React.MouseEvent) => void;
}

const FilterBarOptions: React.FC<IFilterBarOptionsProps> = props => {
  const { filters, label, addAction } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  return (
    <>
      {filters.length > 0 && (
        <div className="filter-bar-options">
          <h2 onClick={toggleVisibility}>
            {label} {isVisible ? "▲" : "▼"}
          </h2>
          <div className={isVisible ? "" : "hide"}>
            <ul>
              {filters.map(f => (
                <li key={f.value}>
                  <button
                    className={determineClassName(f)}
                    onClick={addAction(f)}
                  >
                    {f.value}
                  </button>
                </li>
              ))}
            </ul>
            <p className="instructions">Click to add</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBarOptions;
