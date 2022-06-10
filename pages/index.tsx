import { DefaultRootState } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import TodoList from "../share/components/todo";
import { actions as todoActions } from "../share/components/todo/logicBundle";
import { wrapper } from "../share/store";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await (store.dispatch as ThunkDispatch<DefaultRootState, any, AnyAction>)(
      todoActions.fetch.action()
    );

    return { props: {} };
  }
);

export default TodoList;
