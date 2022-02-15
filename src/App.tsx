import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import GitHubForkRibbon from "react-github-fork-ribbon";

const App: React.FC = () => {
  return (
    <>
      <div className="flex items-center bg-primary px-8 py-5 text-gltf-green">
        <img
          className="h-10"
          src={`${process.env.PUBLIC_URL}/glTF_RGB_June16.svg`}
          alt="glTF"
        />
        <h1 className="pl-2">Project Explorer</h1>
      </div>
      <div className="container mx-auto">
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
