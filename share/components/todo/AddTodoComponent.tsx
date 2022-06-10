import * as React from "react";

import { bindActions as bindTodoActions } from "./logicBundle";

function AddTodoComponent(props: { addTodo: typeof bindTodoActions.create }) {
  const inputRef = React.useRef(null);
  const addTodo = async () => {
    // `current` points to the mounted text input element
    const element = inputRef.current;

    await props.addTodo(element.value);

    element.value = "";
  };

  return (
    <div className="col-md-12">
      <div className="form-inline">
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Todo"
          />
        </div>
        <button type="button" className="btn btn-success" onClick={addTodo}>
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default React.memo(AddTodoComponent);
