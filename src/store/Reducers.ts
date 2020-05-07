import { combineReducers } from "redux";
import { projects } from "./projects/Reducers";
import { filters } from "./filters/Reducers";
import { results } from "./results/Reducers";

export default combineReducers({
  projects,
  filters,
  results
});
