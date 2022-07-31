import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ResultsActionTypes } from "./Types";
import { IStoreResultsAction } from "./Interfaces";

export function storeResults(results: IProjectInfo[]): IStoreResultsAction {
  return {
    type: ResultsActionTypes.STORE_RESULTS,
    results,
  };
}
