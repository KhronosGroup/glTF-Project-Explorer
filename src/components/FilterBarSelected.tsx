import { IFilter } from "../interfaces/IFilter";
import { determineClassName } from "../utils/FilterHelpers";

interface IFilterBarSelectedProps {
  selectedFilters: Set<IFilter>;
  removeAction: (f: IFilter) => (_: React.MouseEvent) => void;
  resetAction: (_: React.MouseEvent) => void;
}

const FilterBarSelected: React.FC<IFilterBarSelectedProps> = (props) => {
  const { selectedFilters, removeAction, resetAction } = props;

  const selectedFiltersArray = Array.from(selectedFilters);

  return (
    <div className="mt-2 py-2 px-3">
      <h2 className="m-0 text-xl">Selected Filters</h2>
      <ul className="mt-2 list-none border border-slate-300 bg-white pt-2">
        {selectedFiltersArray.length > 0 ? (
          <>
            {selectedFiltersArray.map((f) => (
              <li className="inline-block" key={f.value}>
                <button
                  className={`${determineClassName(
                    f
                  )} mb-2 ml-2 cursor-pointer rounded-sm border-none p-1 text-xs`}
                  onClick={removeAction(f)}
                >
                  {f.value}{" "}
                  <span className="text-sm font-semibold leading-3">✕</span>
                </button>
              </li>
            ))}
            <li className="inline-block">
              <button
                className="mb-2 ml-2 cursor-pointer rounded-sm border-none p-1 text-xs"
                onClick={resetAction}
              >
                Clear All Filters
              </button>
            </li>
          </>
        ) : (
          <li className="inline-block">
            <p className="m-2 mt-0 cursor-default p-0 text-slate-500">
              No filters selected.
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FilterBarSelected;
