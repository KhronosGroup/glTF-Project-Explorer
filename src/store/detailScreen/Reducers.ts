import { IDetailScreenState } from "../../interfaces/IAppState";
import { DetailScreenActions } from "./Interfaces";
import { DetailScreenActionTypes } from "./Types";

export function detailScreen(
  state: IDetailScreenState = {},
  action: DetailScreenActions
) {
  switch (action.type) {
    case DetailScreenActionTypes.DETAIL_SCREEN_OPENED:
      return { ...state, projectId: action.projectId };
    case DetailScreenActionTypes.DETAIL_SCREEN_CLOSED:
      return { ...state, projectId: undefined };
    default:
      return state;
  }
}
