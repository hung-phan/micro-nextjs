/* global process */
import { TodoModel } from "../../../domain/model";
import { actions, reducer } from "../logicBundle";

describe("todo/logicBundle", () => {
  describe("reducer", () => {
    const todos = [
      new TodoModel.Todo({
        id: "1",
        text: "New Todo 1",
        complete: false
      }),
      new TodoModel.Todo({
        id: "2",
        text: "New Todo 2",
        complete: false
      }),
      new TodoModel.Todo({
        id: "3",
        text: "New Todo 3",
        complete: false
      })
    ];

    it("should return a todo list with 1 todo item when calls 'create' action", () => {
      expect(
        reducer(
          [],
          actions.create.async.done({
            params: todos[0].id,
            result: todos[0]
          })
        )
      ).toEqual([todos[0]]);
    });

    it("should return a todo list with 2 todo items when calls 'remove' action", () => {
      expect(
        reducer(
          todos,
          actions.remove.async.done({
            params: todos[0].id
          })
        )
      ).toEqual(todos.slice(1));
    });

    it("should return a todo list when calls 'fetch' action", () => {
      expect(
        reducer(
          [],
          actions.fetch.async.done({
            result: todos
          })
        )
      ).toEqual(todos);
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      todos[1].complete = true;

      expect(
        reducer(
          todos,
          actions.complete.async.done({
            params: todos[1].id,
            result: todos[1]
          })
        )
      ).toEqual(todos);
    });
  });
});
