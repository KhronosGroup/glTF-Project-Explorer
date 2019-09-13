import React, { useState } from "react";
import "./App.css";
import { IProjectInfo } from "./interfaces/IProjectInfo";
import ProjectList from "./components/ProjectList";

const App: React.FC = () => {
  const [] = useState<IProjectInfo[]>([]);

  return (
    <>
      <div className="header">
        <h1>glTF Project Explorer</h1>
      </div>
      <ProjectList></ProjectList>
    </>
  );
};

export default App;
