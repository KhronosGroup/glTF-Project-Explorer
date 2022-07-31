import { IProjectInfo } from "../../interfaces/IProjectInfo";
import { ResultsActionTypes } from "./Types";

export type ResultsActions = IStoreResultsAction | IRecalculateResultsAction;

export interface IStoreResultsAction {
  readonly type: ResultsActionTypes.STORE_RESULTS;
  readonly results: IProjectInfo[];
}

interface IRecalculateResultsAction {
  readonly type: ResultsActionTypes.RECALCULATE_RESULTS;
}
