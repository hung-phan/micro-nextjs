/* global process */
import { TodoModel } from "../../../domain/model";
import { actions, reducer } from "../logicBundle";

describe("todo/logicBundle", () => {
  describe("reducer", () => {
    const todoList = [
      new TodoModel.Todo({
        id: "1",
        text: "New Todo 1",
        complete: false,
      }),
      new TodoModel.Todo({
        id: "2",
        text: "New Todo 2",
        complete: false,
      }),
      new TodoModel.Todo({
        id: "3",
        text: "New Todo 3",
        complete: false,
      }),
    ];

    it("should return a todo list with 1 todo item when calls 'create' action", () => {
      expect(
        reducer(
          [],
          actions.create.async.done({
            params: todoList[0].id,
            result: todoList[0],
          })
        )
      ).toEqual([todoList[0]]);
    });

    it("should return a todo list with 2 todo items when calls 'remove' action", () => {
      expect(
        reducer(
          todoList,
          actions.remove.async.done({
            params: todoList[0].id,
            result: undefined,
          })
        )
      ).toEqual(todoList.slice(1));
    });

    it("should return a todo list when calls 'fetch' action", () => {
      expect(
        reducer(
          [],
          actions.fetch.async.done({
            result: todoList,
          })
        )
      ).toEqual(todoList);
    });

    it("should return a todoList list with 1 completed todo when calls 'completeTodo' action", () => {
      todoList[1].complete = true;

      expect(
        reducer(
          todoList,
          actions.complete.async.done({
            params: todoList[1].id,
            result: todoList[1],
          })
        )
      ).toEqual(todoList);
    });
  });
});
