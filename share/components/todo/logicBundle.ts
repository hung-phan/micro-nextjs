import update from "immutability-helper";
import { ActionType, createAction, getType, StateType } from "typesafe-actions";
import { TodoModel } from "../../domain/model";
import { ITodo } from "../../domain/model/Todo";

const ADD_TODO = "todos/ADD_TODO";
const REMOVE_TODO = "todos/REMOVE_TODO";
const COMPLETE_TODO = "todos/COMPLETE_TODO";
const SET_TODOS = "todos/SET_TODOS";

export const actions = {
  addTodo: createAction(ADD_TODO, resolve => (text: string) =>
    resolve(text)
  ),
  removeTodo: createAction(REMOVE_TODO, resolve => (id: string) => resolve(id)),
  completeTodo: createAction(COMPLETE_TODO, resolve => (id: string) =>
    resolve(id)
  ),
  setTodos: createAction(SET_TODOS, resolve => (todoData: TodoModel.ITodo[]) =>
    resolve(todoData.map((opts: ITodo) => new TodoModel.Todo(opts)))
  )
};

export type TodosAction = ActionType<typeof actions>;

export const reducer = (
  state: TodoModel.Todo[] = [],
  action: TodosAction
): TodoModel.Todo[] => {
  switch (action.type) {
    case getType(actions.addTodo):
      return update<TodoModel.Todo[]>(state, {
        $push: [{ complete: false, text: action.payload }]
      });

    case getType(actions.removeTodo):
      return update<TodoModel.Todo[]>(state, {
        $splice: [[action.payload, 1]]
      });

    case getType(actions.completeTodo):
      const todo = state[action.payload];

      return update<TodoModel.Todo[]>(state, {
        $splice: [
          [action.payload, 1],
          [
            action.payload,
            0,
            {
              ...todo,
              complete: !todo.complete
            }
          ]
        ]
      });

    case getType(actions.setTodos):
      return action.payload;

    default:
      return state;
  }
};

export type TodosState = StateType<typeof reducer>;

export const mountPoint = "todos";

export const selectors = {
  getTodos: (state): TodoModel.Todo[] => state[mountPoint]
};
