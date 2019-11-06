/* global process */

import { AnyAction, applyMiddleware, compose, createStore, Store } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import rootReducer from "./rootReducer";
import { IApplicationState } from "./state";

export const middlewares = [
  thunkMiddleware as ThunkMiddleware<IApplicationState, AnyAction>
];

export const enhancers = [];

if (process.env.ENVIRONMENT === "client") {
  if (process.env.NODE_ENV === "development") {
    const { createLogger } = require("redux-logger");

    middlewares.push(createLogger({ level: "info" }));
  }

  if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export default (
  initialState: object = {}
): Store<IApplicationState, AnyAction> =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
