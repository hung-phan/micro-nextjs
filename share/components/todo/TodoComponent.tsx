import * as _ from "lodash";
import * as React from "react";

import { TodoModel } from "../../domain/model";
import { bindActions as bindTodoActions } from "./logicBundle";

function TodoComponent(props: {
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
          <svg
            className="bi bi-check"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-xs btn-danger"
          onClick={remove}
        >
          <svg
            className="bi bi-trash"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default React.memo(TodoComponent, (prevProps, nextProps) =>
  _.isEqual(prevProps.todo, nextProps.todo)
);
