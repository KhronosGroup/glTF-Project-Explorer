import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ResultsActionTypes } from "./Types";
import { IRecalculateResultsAction, IStoreResultsAction } from "./Interfaces";

export function storeResults(results: IProjectInfo[]): IStoreResultsAction {
  return {
    type: ResultsActionTypes.STORE_RESULTS,
    results,
  };
}

export function recalculateResults(): IRecalculateResultsAction {
  return {
    type: ResultsActionTypes.RECALCULATE_RESULTS,
  };
}
