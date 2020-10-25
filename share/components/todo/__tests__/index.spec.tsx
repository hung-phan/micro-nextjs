import { render } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import TodoList from "..";
import makeStore from "../../../makeStore";
import { actions, mountPoint, reducer } from "../logicBundle";
import { combineReducers } from "redux";

describe("todo/TodoList", () => {
  let store;

  beforeEach(() => {
    store = makeStore(
      combineReducers({
        [mountPoint]: reducer,
      })
    )();
    store.dispatch(
      actions.fetch.async.done({
        result: [
          { id: "1", text: "Todo 1", complete: false },
          { id: "2", text: "Todo 2", complete: false },
          { id: "3", text: "Todo 3", complete: false },
          { id: "4", text: "Todo 4", complete: false },
        ],
      })
    );
  });

  it("should render component", () => {
    expect(
      render(
        <Provider key="provider" store={store}>
          <TodoList />
        </Provider>
      )
    ).toMatchSnapshot();
  });
});
