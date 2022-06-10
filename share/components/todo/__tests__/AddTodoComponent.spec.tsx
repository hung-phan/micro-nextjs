import { mount } from "enzyme";
import * as React from "react";

import AddTodoComponent from "../AddTodoComponent";

describe("todo/AddTodoComponent", () => {
  it("should call the addTodo action when click on the 'Add Todo' button", () => {
    const callback = jest.fn();
    const component = mount(<AddTodoComponent addTodo={callback} />);
    const input = component.find("input");
    const button = component.find("button");

    input.instance().value = "do chore";
    button.simulate("click");
    expect(callback).toBeCalledWith("do chore");
  });
});
