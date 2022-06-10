import { Context, HYDRATE, MakeStore, createWrapper } from "next-redux-wrapper";
import { DefaultRootState } from "react-redux";
import {
  AnyAction,
  Store,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";

import {
  State as TodoState,
  mountPoint as todoMountPoint,
  reducer as todoReducer,
} from "../share/components/todo/logicBundle";

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

export interface RootState {
  [todoMountPoint]: TodoState;
}

const applicationReducer = combineReducers({
  [todoMountPoint]: todoReducer,
});

export const makeStore: MakeStore<Store<RootState>> = (_: Context) =>
  createStore(
    (state: RootState, action: AnyAction) => {
      switch (action.type) {
        case HYDRATE:
          return { ...state, ...action.payload };
        default:
          return applicationReducer(state, action);
      }
    },
    {}, // preloadedState
    compose(applyMiddleware(...middlewares), ...enhancers)
  );

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  serializeState: JSON.stringify,
  deserializeState: JSON.parse,
});
