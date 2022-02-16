import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import GitHubForkRibbon from "react-github-fork-ribbon";
import { useWindowDimensions } from "./utils/WindowWidthHook";

const App: React.FC = () => {
  const { width } = useWindowDimensions();

  // 1024 corresponds to the pixel width of our lg breakpoint.
  const allowFilterCollapse = width < 1024;

  return (
    <div>
      <div className="flex items-center bg-primary px-8 py-5 text-gltf-green">
        <img
          className="h-10"
          src={`${process.env.PUBLIC_URL}/glTF_RGB_June16.svg`}
          alt="glTF"
        />
        <h1 className="pl-2">Project Explorer</h1>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 xl:grid-cols-4">
        <div className="col-auto h-fit">
          <SearchBar></SearchBar>
          <FilterBar allowCollapse={allowFilterCollapse}></FilterBar>
        </div>
        <div className="lg:col-span-2 xl:col-span-3">
          <ProjectList></ProjectList>
        </div>
      </div>
      <GitHubForkRibbon
        position="right"
        color="white"
        href="https://github.com/KhronosGroup/glTF-Project-Explorer"
      >
        Fork us on GitHub
      </GitHubForkRibbon>
    </div>
  );
};

export default App;
