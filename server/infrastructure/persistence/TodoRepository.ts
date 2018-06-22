import * as DataLoader from "dataloader";
import { TodoModel } from "../../../share/domain/model";
import * as databaseConnector from "./databaseConnector";

const batchLoadFn: DataLoader.BatchLoadFn<string, TodoModel.Todo> = keys => {
  const set = new Set(keys);
  const data = databaseConnector.todoData
    .filter(({ id }) => set.has(id))
    .map((opts: TodoModel.ITodo) => new TodoModel.Todo(opts));

  return Promise.resolve(data);
};

export const dataloader = new DataLoader(batchLoadFn);

export const getAll = (): Promise<TodoModel.Todo[]> =>
  Promise.resolve(
    databaseConnector.todoData.map(
      (opts: TodoModel.ITodo) => new TodoModel.Todo(opts)
    )
  );

export const getById = (id: string): Promise<TodoModel.Todo> =>
  dataloader.load(id);

export const getByIds = (ids: string[]): Promise<TodoModel.Todo[]> =>
  dataloader.loadMany(ids);
