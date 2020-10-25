import update from "immutability-helper";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { asyncFactory, thunkToAction } from "typescript-fsa-redux-thunk";
import { TodoModel } from "../../domain/model";
import fetch from "../../library/fetch";
import { IApplicationState, todoMountPoint, TodoState } from "../../state";

export const selectors = {
  getTodo: (state: IApplicationState): TodoState => state[todoMountPoint],

  _findById: (internalState: TodoState, id: string) =>
    internalState.find((todo) => todo.id === id),

  _findIndexById: (internalState: TodoState, id: string) =>
    internalState.findIndex((todo) => todo.id === id),
};

const actionCreator = actionCreatorFactory(todoMountPoint);

const asyncActionCreator = asyncFactory<IApplicationState>(actionCreator);

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
      const todo = selectors._findById(selectors.getTodo(getState()), id);

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
      const todo = selectors._findById(selectors.getTodo(getState()), id);

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

  fetch: asyncActionCreator<void, TodoState>("FETCH", () =>
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

export const reducer = reducerWithInitialState<TodoState>([])
  .case(actions.create.async.done, (state, action) =>
    update<TodoState>(state, {
      $push: [action.result],
    })
  )
  .case(actions.remove.async.done, (state, action) => {
    const todoIndex = selectors._findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<TodoState>(state, {
      $splice: [[todoIndex, 1]],
    });
  })
  .case(actions.complete.async.done, (state, action) => {
    const todoIndex = selectors._findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<TodoState>(state, {
      $splice: [
        [todoIndex, 1],
        [todoIndex, 0, action.result],
      ],
    });
  })
  .case(actions.fetch.async.done, (_state, action) => action.result)
  .build();
