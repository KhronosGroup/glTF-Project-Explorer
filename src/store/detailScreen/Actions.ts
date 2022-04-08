import {
  ICloseDetailScreenAction,
  IOpenDetailScreenAction,
} from "./Interfaces";
import { DetailScreenActionTypes } from "./Types";

export function openDetailScreen(projectId: number): IOpenDetailScreenAction {
  return {
    type: DetailScreenActionTypes.DETAIL_SCREEN_OPENED,
    projectId,
  };
}

export function closeDetailScreen(): ICloseDetailScreenAction {
  return {
    type: DetailScreenActionTypes.DETAIL_SCREEN_CLOSED,
  };
}
