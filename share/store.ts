import {
  AnyAction,
  applyMiddleware,
  compose,
  combineReducers,
  createStore,
} from "redux";
import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  mountPoint as todoMountPoint,
  reducer as todoReducer,
  State as TodoState,
} from "../share/components/todo/logicBundle";
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

export interface RootState {
  [todoMountPoint]: TodoState;
}

const applicationReducer = combineReducers({
  [todoMountPoint]: todoReducer,
});

export const makeStore: MakeStore<RootState> = (_: Context) =>
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

export const wrapper = createWrapper<RootState>(makeStore, {
  serializeState: JSON.stringify,
  deserializeState: JSON.parse
});
