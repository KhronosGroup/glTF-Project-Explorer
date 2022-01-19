import { useCallback } from "react";
import { connect } from "react-redux";
import { IAppState } from "../interfaces/IAppState";
import { updateTitleSubstringFilter } from "../store/filters/Actions";
import "./SearchBar.css";

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
    <div className="search-bar">
      <h1>Search by Title</h1>
      <input
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
