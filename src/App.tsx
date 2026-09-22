import ProjectList from "./components/ProjectList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
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
        <h1 className="flex-1 pl-2">Project Explorer</h1>
        <a
          className="bg-white font-semibold visited:bg-white focus:bg-white active:bg-white hover:bg-gltf-green hover:text-white py-2 px-4 mx-4 border border-slate-300 hover:border-transparent rounded"
          href="https://ecosystem.khronos.org/submit/"
        >
          Submit New Project
        </a>
        <a href="https://www.github.com/KhronosGroup/glTF-Project-Explorer">
          <img
            className="h-10"
            src={`${process.env.PUBLIC_URL}/github-mark-white.svg`}
            alt="GitHub"
          />
        </a>
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
    </div>
  );
};

export default App;
