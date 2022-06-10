import Link from "next/link";
import * as React from "react";
import { DefaultRootState, connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import AddTodoComponent from "./AddTodoComponent";
import TodoComponent from "./TodoComponent";
import {
  State,
  bindActions as bindTodoActions,
  selectors as todoSelectors,
} from "./logicBundle";

export class TodoListComponent extends React.Component<{
  todoState: State;
  actions: typeof bindTodoActions;
}> {
  public render() {
    const { todoState, actions } = this.props;

    return (
      <>
        <style jsx>{`
          .table {
            margin-top: 20px;
          }
        `}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Todo List</h1>
            </div>

            <AddTodoComponent addTodo={actions.create} />

            <div className="col-md-12">
              <table className="table">
                <tbody>
                  {todoState.map((_todo) => (
                    <TodoComponent
                      key={_todo.id}
                      todo={_todo}
                      complete={actions.complete}
                      remove={actions.remove}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-md-12">
              <Link href="/static-page">
                <a>Go to static page</a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  (state: DefaultRootState) => ({
    todoState: todoSelectors.getCurrentState(state),
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(bindTodoActions, dispatch),
  })
)(TodoListComponent);
