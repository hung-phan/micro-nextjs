import { combineReducers } from "redux";
import {
  mountPoint as todoMountPoint,
  reducer as todoReducer
} from "./components/todo/logicBundle";

const rootReducer = combineReducers({
  [todoMountPoint]: todoReducer
});

export default rootReducer;
