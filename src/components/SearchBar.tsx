import { connect } from "react-redux";
import { IAppState } from "../interfaces/IAppState";
import { updateTitleSubstringFilter } from "../store/filters/Actions";
import { useCallback } from "react";

export interface ISearchBarProps {
  titleSubstring: string;
  updateTitleSubstringFilter: typeof updateTitleSubstringFilter;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {
  const { titleSubstring, updateTitleSubstringFilter } = props;

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTitleSubstring = event.target.value;
      updateTitleSubstringFilter(newTitleSubstring);
    },
    [updateTitleSubstringFilter]
  );

  return (
    <div className="m-4 flex flex-col items-stretch rounded bg-near-white p-4 shadow-sharp">
      <h1 className="m-0 p-0 text-2xl">Search by Title or Description</h1>
      <input
        className="mt-2 h-12 border border-slate-300 p-4 text-base leading-6"
        placeholder="Type to search"
        value={titleSubstring}
        onChange={handleSearch}
      ></input>
    </div>
  );
};

function mapStateToProps(state: IAppState) {
  const {
    filters: { titleSubstring },
  } = state;

  return {
    titleSubstring,
  };
}

const mapDispatchToProps = {
  updateTitleSubstringFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
