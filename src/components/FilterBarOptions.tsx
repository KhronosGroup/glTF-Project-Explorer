import { useState, useCallback } from "react";
import { IFilter } from "../interfaces/IFilter";
import { determineClassName } from "../utils/FilterHelpers";

export interface IFilterBarOptionsProps {
  filters: IFilter[];
  label: string;
  addAction: (f: IFilter) => (_: React.MouseEvent) => void;
}

const FilterBarOptions: React.FC<IFilterBarOptionsProps> = (props) => {
  const { filters, label, addAction } = props;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible, setIsVisible]);

  return (
    <>
      {filters.length > 0 && (
        <div className="mt-2 py-2 px-3">
          <h2
            className="m-0 w-full cursor-pointer text-base"
            onClick={toggleVisibility}
          >
            {label} {isVisible ? "▲" : "▼"}
          </h2>
          <div className={isVisible ? "" : "hide"}>
            <ul className="mt-2 list-none border border-slate-300 bg-white pt-2">
              {filters.map((f) => (
                <li className="inline-block" key={f.value}>
                  <button
                    className={`${determineClassName(
                      f
                    )} mb-2 ml-2 cursor-pointer rounded-sm border-none p-1 text-xs`}
                    onClick={addAction(f)}
                  >
                    {f.value}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-1 ml-2 text-xs italic text-slate-500">
              Click to add
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBarOptions;
