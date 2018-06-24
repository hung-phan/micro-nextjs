/* global process */
import { actions, reducer } from "../logicBundle";

describe("Module: Todos", () => {
  describe("Reducer", () => {
    it("should return a todos list with 1 todo item when calls 'addTodo' action", () => {
      expect(reducer([], actions.addTodo("do chore"))).toEqual([
        { text: "do chore", complete: false }
      ]);
    });

    it("should return an empty todos list when calls 'removeTodo' action", () => {
      expect(
        reducer([{ text: "do chore", complete: false }], actions.removeTodo(0))
      ).toEqual([]);
    });

    it("should return an todos list when calls 'setTodos' action", () => {
      expect(
        reducer([], actions.setTodos([{ text: "do chore", complete: false }]))
      ).toEqual([{ text: "do chore", complete: false }]);
    });

    it("should return a todos list with 1 completed todo when calls 'completeTodo' action", () => {
      expect(
        reducer([{ text: "do chore", complete: false }], actions.completeTodo(0))
      ).toEqual([{ text: "do chore", complete: true }]);

      expect(
        reducer([{ text: "do chore", complete: true }], actions.completeTodo(0))
      ).toEqual([{ text: "do chore", complete: false }]);
    });
  });
});
