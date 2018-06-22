import * as React from "react";
import { actions as todoActions } from "./logicBundle";

export default class TodosAdd extends React.PureComponent<{ addTodo: typeof todoActions.addTodo }> {
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

  private addTodo = () => {
    const element = this.inputRef.current;

    this.props.addTodo(element.value);
    element.value = "";
  };
}
