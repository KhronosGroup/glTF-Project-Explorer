import React from "react";
import "./App.css";
import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import GitHubForkRibbon from "react-github-fork-ribbon";

const App: React.FC = () => {
  return (
    <>
      <div className="header">
        <img src="/glTF_RGB_June16.svg" alt="glTF" />
        <h1>Project Explorer</h1>
      </div>
      <div className="content">
        <SearchBar></SearchBar>
        <FilterBar></FilterBar>
        <ProjectList></ProjectList>
      </div>
      <GitHubForkRibbon
        position="right"
        color="white"
        href="https://github.com/KhronosGroup/glTF-Project-Explorer"
      >
        Fork us on GitHub
      </GitHubForkRibbon>
    </>
  );
};

export default App;
