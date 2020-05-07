import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import "./index.css";
import App from "./App";
import rootReducer from "./store/Reducers";
import rootSagas from "./store/Sagas";

// A note about the use of redux here; a lot of inner deliberations were made
// before choosing to pull in both Redux and Sagas for this app. The idea is
// to keep this app mostly simple, but Redux and Sagas were pulled in for two
// major reasons:
//
//   1. We have to communicate data changes across the app to several components.
//   2. Redux makes managing complex state changes (such as filtering) easy.
//
// Yes, this is probably over-engineered, but Redux is the best tool for this
// potentially complex task. If you hate it, blame me and I'd be glad to bike
// shed about it with you. -ANM

const initialState = {};

const sagaMiddleware = createSagaMiddleware({});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
