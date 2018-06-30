import { mount } from "enzyme";
import { noop } from "lodash";
import * as React from "react";
import { TodoModel } from "../../../domain/model";
import TodoComponent from "../TodoComponent";

describe("todo/TodoComponent", () => {
  const todo: TodoModel.Todo = new TodoModel.Todo({
    id: "0",
    text: "Todo",
    complete: false
  });

  it("should call 'removeTodo' when click on the delete button", () => {
    const removeTodo = jest.fn();
    const component = mount(
      <table className="table">
        <tbody>
          <TodoComponent
            todo={todo}
            remove={removeTodo}
            complete={noop as any}
          />
        </tbody>
      </table>
    );
    const removeButton = component.find(".btn-danger");
    removeButton.simulate("click");

    expect(removeTodo.mock.calls[0][0]).toBe("0");
  });

  it("should call 'completeTodo' when click on the complete button", () => {
    const completeTodo = jest.fn();
    const component = mount(
      <table className="table">
        <tbody>
        <TodoComponent
          todo={todo}
          remove={noop as any}
          complete={completeTodo}
        />
        </tbody>
      </table>
    );
    const completeButton = component.find(".btn-success");
    completeButton.simulate("click");

    expect(completeTodo.mock.calls[0][0]).toBe("0");
  });
});
