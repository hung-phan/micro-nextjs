import TodoList from "../share/components/todo";
import { wrapper } from "../share/store";
import { ThunkDispatch } from "redux-thunk";
import { DefaultRootState } from "react-redux";
import { AnyAction } from "redux";
import { actions as todoActions } from "../share/components/todo/logicBundle";

export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
  await (store.dispatch as ThunkDispatch<DefaultRootState, any, AnyAction>)(
    todoActions.fetch.action()
  );
});

export default TodoList;
