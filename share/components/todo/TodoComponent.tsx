import * as React from "react";
import { TodoModel } from "../../domain/model";
import { actions as todoActions } from "./logicBundle";

class TodoComponent extends React.Component<{
  todo: TodoModel.Todo;
  completeTodo: typeof todoActions.completeTodo;
  removeTodo: typeof todoActions.removeTodo;
}> {
  public render() {
    const text = this.props.todo.complete ? (
      <s>{this.props.todo.text}</s>
    ) : (
      <span>{this.props.todo.text}</span>
    );

    return (
      <tr>
        <td>
          <span>{this.props.todo.id}</span>
        </td>
        <td>{text}</td>
        <td>
          <button
            type="button"
            className="btn btn-xs btn-success"
            onClick={this.completeTodo}
          >
            <i className="fa fa-check" />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-xs btn-danger"
            onClick={this.removeTodo}
          >
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  private completeTodo = () => {
    this.props.completeTodo(this.props.todo.id);
  };

  private removeTodo = () => {
    this.props.removeTodo(this.props.todo.id);
  };
}

export default TodoComponent;
