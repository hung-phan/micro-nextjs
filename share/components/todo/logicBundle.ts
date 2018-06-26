import update from "immutability-helper";
import * as _ from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { TodoModel } from "../../domain/model";
import fetch from "../../library/fetch";

export type TodoState = TodoModel.Todo[];

export const mountPoint = "todos";

export const selectors = {
  getTodos: (state): TodoState => state[mountPoint],

  _internal: {
    findById: (internalState: TodoState, id: string) =>
      internalState.find(todo => todo.id === id),

    findIndexById: (internalState: TodoState, id: string) =>
      internalState.findIndex(todo => todo.id === id)
  }
};

const actionCreator = actionCreatorFactory("todos");

const asyncActionCreator = asyncFactory(actionCreator);

export const actions = {
  create: asyncActionCreator<string, TodoModel.Todo>("CREATE", text =>
    fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ text })
    }).then(res => res.json())
  ),

  remove: asyncActionCreator<string, void>("REMOVE", id =>
    fetch(`/api/todo/${id}`, { method: "DELETE" }).then(_.noop)
  ),

  complete: asyncActionCreator<string, TodoModel.Todo>(
    "COMPLETE",
    (id, _dispatch, getState) => {
      const todo = selectors._internal.findById(
        selectors.getTodos(getState()),
        id
      );

      if (!todo) {
        return;
      }

      return fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          complete: !todo.complete
        })
      }).then(res => res.json());
    }
  ),

  fetch: asyncActionCreator<void, TodoState>("FETCH", () =>
    fetch("/api/todo")
      .then(res => res.json())
      .then((todoData: TodoModel.ITodo[]) =>
        todoData.map((opts: TodoModel.ITodo) => new TodoModel.Todo(opts))
      )
  )
};

export const reducer = reducerWithInitialState<TodoState>([])
  .case(actions.create.async.done, (state, action) =>
    update<TodoState>(state, {
      $push: [action.result]
    })
  )
  .case(actions.remove.async.done, (state, action) => {
    const todoIndex = selectors._internal.findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<TodoState>(state, {
      $splice: [[todoIndex, 1]]
    });
  })
  .case(actions.complete.async.done, (state, action) => {
    const todoIndex = selectors._internal.findIndexById(state, action.params);

    if (todoIndex === -1) {
      return state;
    }

    return update<TodoState>(state, {
      $splice: [[todoIndex, 1], [todoIndex, 0, action.result]]
    });
  })
  .case(actions.fetch.async.done, (_state, action) => action.result)
  .build();
