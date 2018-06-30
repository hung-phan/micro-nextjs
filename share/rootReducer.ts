import { combineReducers } from "redux";
import { reducer as todoReducer } from "./components/todo/logicBundle";
import { todoMountPoint } from "./state";

const rootReducer = combineReducers({
  [todoMountPoint]: todoReducer
});

export default rootReducer;
