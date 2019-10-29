import React from "react";
import "./App.css";
import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <>
      <div className="header">
        <h1>glTF Project Explorer</h1>
      </div>
      <div className="content">
        <SearchBar></SearchBar>
        <FilterBar></FilterBar>
        <ProjectList></ProjectList>
      </div>
    </>
  );
};

export default App;
