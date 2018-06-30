import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch, Store } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState, TodoState } from "../../state";
import AddTodoComponent from "./AddTodoComponent";
import {
  actions as todoActions,
  bindActions as bindTodoActions,
  selectors as todoSelectors
} from "./logicBundle";
import TodoComponent from "./TodoComponent";

export class TodoListComponent extends React.Component<{
  todos: TodoState;
  actions: typeof bindTodoActions;
}> {
  public static async getInitialProps({
    pathname,
    store
  }: {
    pathname: string;
    store: Store<IApplicationState, AnyAction>;
  }) {
    await (store.dispatch as ThunkDispatch<IApplicationState, any, AnyAction>)(
      todoActions.fetch.action()
    );

    return { pathname };
  }

  public render() {
    const { todos, actions } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Todos List</h1>
          </div>

          <AddTodoComponent addTodo={actions.create} />

          <div className="col-md-12">
            <table className="table">
              <tbody>
                {todos.map(todo => (
                  <TodoComponent
                    key={todo.id}
                    todo={todo}
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
        <style jsx>{`
          .table {
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState) => ({
    todos: todoSelectors.getTodos(state)
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(bindTodoActions, dispatch)
  })
)(TodoListComponent);
