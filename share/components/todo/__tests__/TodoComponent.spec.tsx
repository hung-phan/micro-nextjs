import { mount } from "enzyme";
import { noop } from "lodash";
import * as React from "react";
import { TodoModel } from "../../../domain/model";
import TodoComponent from "../TodoComponent";

describe("Component: TodoComponent", () => {
  const todo: TodoModel.Todo = new TodoModel.Todo({
    id: "0",
    text: "Todo",
    complete: false
  });

  it("should call 'removeTodo' when click on the delete button", () => {
    const removeTodo = jest.fn();
    const component = mount(
      <TodoComponent
        todo={todo}
        removeTodo={removeTodo}
        completeTodo={noop}
      />
    );
    const removeButton = component.find(".btn-danger");
    removeButton.simulate("click");

    expect(removeTodo.mock.calls[0][0]).toBe("0");
  });

  // it("should call 'completeTodo' when click on the complete button", () => {
  //   const completeTodo = jest.fn();
  //   const component = mount(
  //     <TodosBody todos={todos} removeTodo={noop} completeTodo={completeTodo} />
  //   );
  //   const trComponents = component.find("tr");
  //
  //   trComponents.forEach((tr, index) => {
  //     const completeButton = tr.find(".btn-success");
  //     completeButton.simulate("click");
  //
  //     expect(completeTodo.mock.calls[index][0]).toBe(index);
  //   });
  //   expect(completeTodo.mock.calls.length).toEqual(todos.length);
  // });
});
