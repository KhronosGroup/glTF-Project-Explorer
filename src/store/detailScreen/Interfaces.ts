import { DetailScreenActionTypes } from "./Types";

export type DetailScreenActions =
  | IOpenDetailScreenAction
  | ICloseDetailScreenAction;

export interface IOpenDetailScreenAction {
  readonly type: DetailScreenActionTypes.DETAIL_SCREEN_OPENED;
  readonly projectId: number;
}

export interface ICloseDetailScreenAction {
  readonly type: DetailScreenActionTypes.DETAIL_SCREEN_CLOSED;
}
