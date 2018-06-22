import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import {
  mountPoint as todoMountPoint,
  reducer as todoReducer
} from "./components/todo/logicBundle";

const rootReducer = combineReducers({
  [todoMountPoint]: todoReducer
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
