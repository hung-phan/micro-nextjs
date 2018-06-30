import * as React from "react";
import { bindActions as bindTodoActions } from "./logicBundle";

export default class AddTodoComponent extends React.PureComponent<{
  addTodo: typeof bindTodoActions.create;
}> {
  private readonly inputRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  public render() {
    return (
      <div className="col-md-12">
        <div className="form-inline">
          <div className="form-group">
            <input
              ref={this.inputRef}
              type="text"
              className="form-control"
              placeholder="Todo"
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }

  private addTodo = async () => {
    const element = this.inputRef.current;

    await this.props.addTodo(element.value);

    element.value = "";
  };
}
