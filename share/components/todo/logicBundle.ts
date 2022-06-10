import update from "immutability-helper";
import { DefaultRootState } from "react-redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { asyncFactory, thunkToAction } from "typescript-fsa-redux-thunk";

import { TodoModel } from "../../domain/model";
import fetch from "../../library/fetch";

export type State = TodoModel.Todo[];

export const mountPoint = "todoState";

export const selectors = {
  getCurrentState: (state: DefaultRootState): State => state[mountPoint],

  _findById: (internalState: State, id: string) =>
    internalState.find((todo) => todo.id === id),

  _findIndexById: (internalState: State, id: string) =>
    internalState.findIndex((todo) => todo.id === id),
};

const actionCreator = actionCreatorFactory(mountPoint);

const asyncActionCreator = asyncFactory<DefaultRootState>(actionCreator);

export const actions = {
  create: asyncActionCreator<string, TodoModel.Todo>("CREATE", (text) =>
    fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ text }),
    }).then((res) => res.json())
  ),

  remove: asyncActionCreator<string, void>(
    "REMOVE",
    async (id, _dispatch, getState) => {
      const todo = selectors._findById(
        selectors.getCurrentState(getState()),
        id
      );

      if (!todo) {
        return;
      }

      try {
        await fetch(`/api/todo/${id}`, { method: "DELETE" });
      } catch (e) {
        // do nothing
      }
    }
  ),

  complete: asyncActionCreator<string, TodoModel.Todo>(
    "COMPLETE",
    async (id, _dispatch, getState) => {
      const todo = selectors._findById(
        selectors.getCurrentState(getState()),
        id
      );

      if (!todo) {
        return;
      }

      const result = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          complete: !todo.complete,
        }),
      });

      return result.json();
    }
  ),

  fetch: asyncActionCreator<void, State>("FETCH", () =>
    fetch("/api/todo")
      .then((res) => res.json())
      .then((todoData: TodoModel.ITodo[]) =>
        todoData.map((opts: TodoModel.ITodo) => new TodoModel.Todo(opts))
      )
  ),
};

export const bindActions = {
  create: thunkToAction(actions.create.action),
  remove: thunkToAction(actions.remove.action),
  complete: thunkToAction(actions.complete.action),
  fetch: thunkToAction(actions.fetch.action),
};

export const reducer = reducerWithInitialState<State>([])
  .case(actions.create.async.done, (state, action) =>
    update<State>(state, {
      $push: [action.result],
    })
  )
  .case(actions.remove.async.done, (state, action) => {
    const todoIndex = selectors._findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<State>(state, {
      $splice: [[todoIndex, 1]],
    });
  })
  .case(actions.complete.async.done, (state, action) => {
    const todoIndex = selectors._findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<State>(state, {
      $splice: [
        [todoIndex, 1],
        [todoIndex, 0, action.result],
      ],
    });
  })
  .case(actions.fetch.async.done, (_state, action) => action.result)
  .build();
