/* global process */

import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

export const middlewares = [thunkMiddleware];

export const enhancers = [];

if (process.env.ENVIRONMENT === "client") {
  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger({ level: "info" }));
  }

  if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export default (initialState: object = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
