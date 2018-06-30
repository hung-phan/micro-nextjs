import * as React from "react";
import { TodoModel } from "../../domain/model";
import { bindActions as bindTodoActions } from "./logicBundle";

class TodoComponent extends React.Component<{
  todo: TodoModel.Todo;
  complete: typeof bindTodoActions.complete;
  remove: typeof bindTodoActions.remove;
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
            onClick={this.complete}
          >
            <i className="fa fa-check" />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-xs btn-danger"
            onClick={this.remove}
          >
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  private complete = () => this.props.complete(this.props.todo.id);

  private remove = () => this.props.remove(this.props.todo.id);
}

export default TodoComponent;
