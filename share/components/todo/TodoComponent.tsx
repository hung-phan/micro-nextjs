import * as React from "react";
import { TodoModel } from "../../domain/model";
import { bindActions as bindTodoActions } from "./logicBundle";

export default function TodoComponent(props: {
  todo: TodoModel.Todo;
  complete: typeof bindTodoActions.complete;
  remove: typeof bindTodoActions.remove;
}) {
  const { todo } = props;

  const complete = React.useCallback(() => props.complete(todo.id), [todo.id]);
  const remove = React.useCallback(() => props.remove(todo.id), [todo.id]);

  return (
    <tr>
      <td>
        <span>{todo.id}</span>
      </td>
      <td>{todo.complete ? <s>{todo.text}</s> : <span>{todo.text}</span>}</td>
      <td>
        <button
          type="button"
          className="btn btn-xs btn-success"
          onClick={complete}
        >
          <i className="fa fa-check" />
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-xs btn-danger"
          onClick={remove}
        >
          <i className="fa fa-remove" />
        </button>
      </td>
    </tr>
  );
}
