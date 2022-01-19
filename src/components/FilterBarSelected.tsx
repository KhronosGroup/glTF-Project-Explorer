import { IFilter } from "../interfaces/IFilter";
import "./FilterBarSelected.css";
import { determineClassName } from "../utils/FilterHelpers";

export interface IFilterBarSelectedProps {
  selectedFilters: Set<IFilter>;
  removeAction: (f: IFilter) => (_: React.MouseEvent) => void;
  resetAction: (_: React.MouseEvent) => void;
}

const FilterBarSelected: React.FC<IFilterBarSelectedProps> = (props) => {
  const { selectedFilters, removeAction, resetAction } = props;

  const selectedFiltersArray = Array.from(selectedFilters);

  return (
    <div className="filter-bar-selected">
      <h2>Selected Filters</h2>
      <ul>
        {selectedFiltersArray.length > 0 ? (
          <>
            {selectedFiltersArray.map((f) => (
              <li key={f.value}>
                <button
                  className={determineClassName(f)}
                  onClick={removeAction(f)}
                >
                  {f.value} <span className="clear-cross">✕</span>
                </button>
              </li>
            ))}
            <li>
              <button className="clear-all-filters" onClick={resetAction}>
                Clear All Filters
              </button>
            </li>
          </>
        ) : (
          <li>
            <p className="no-filters-message">No filters selected.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FilterBarSelected;
