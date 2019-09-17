import { IResultsState } from "../../interfaces/IAppState";
import { ResultsActions } from "./Interfaces";
import { ResultsActionTypes } from "./Types";

export function results(
  state: IResultsState = {
    values: []
  },
  action: ResultsActions
) {
  switch (action.type) {
    case ResultsActionTypes.STORE_RESULTS:
      return { ...state, values: action.results };
    default:
      return state;
  }
}
