import React from "react";
import "./App.css";
import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";

const App: React.FC = () => {
  return (
    <>
      <div className="header">
        <h1>glTF Project Explorer</h1>
      </div>
      <div className="content">
        <FilterBar></FilterBar>
        <ProjectList></ProjectList>
      </div>
    </>
  );
};

export default App;
