import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, Store } from "redux";
import { TodoModel } from "../../domain/model";
import fetch from "../../library/fetch";
import AddTodoComponent from "./AddTodoComponent";
import {
  actions as todoActions,
  selectors as todoSelectors,
  TodosState
} from "./logicBundle";
import TodoComponent from "./TodoComponent";

const mapStateToProps = state => ({
  todos: todoSelectors.getTodos(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(todoActions, dispatch)
});

export class TodoListComponent extends React.Component<{
  todos: TodosState;
  actions: typeof todoActions;
}> {
  public static async getInitialProps({
    pathname,
    store
  }: {
    pathname: string;
    store: Store;
  }) {
    await fetch("/api/todo")
      .then(res => res.json())
      .then((todoData: TodoModel.ITodo[]) => {
        store.dispatch(todoActions.setTodos(todoData));
      });

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

          <AddTodoComponent addTodo={actions.addTodo} />

          <div className="col-md-12">
            <table className="table">
              <tbody>
                {todos.map((todo: TodoModel.Todo) => (
                  <TodoComponent
                    key={todo.id}
                    todo={todo}
                    completeTodo={actions.completeTodo}
                    removeTodo={actions.removeTodo}
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
  mapStateToProps,
  mapDispatchToProps
)(TodoListComponent);
