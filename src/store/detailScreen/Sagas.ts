import { takeEvery } from "redux-saga/effects";
import { DetailScreenActionTypes } from "./Types";

// Not sure if this is even needed yet, but stubbed it out.
export function* openDetailScreen() {}

export function* watchForDetailScreenUpdates() {
  yield takeEvery(
    DetailScreenActionTypes.DETAIL_SCREEN_OPENED,
    openDetailScreen
  );
}
