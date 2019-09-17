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
      <FilterBar></FilterBar>
      <ProjectList></ProjectList>
    </>
  );
};

export default App;
