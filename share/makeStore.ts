/* global process */

import {
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
  Reducer,
  Store,
} from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { DefaultRootState } from "react-redux";

export const middlewares = [
  thunkMiddleware as ThunkMiddleware<DefaultRootState, AnyAction>,
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

export default function makeStore(
  reducer: Reducer<DefaultRootState, AnyAction>
): (initialState?: object) => Store<DefaultRootState, AnyAction> {
  return (initialState = {}) =>
    createStore(
      reducer,
      initialState,
      compose(applyMiddleware(...middlewares), ...enhancers)
    );
}
