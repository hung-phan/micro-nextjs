import * as DataLoader from "dataloader";
import { Todo } from "../../domain/model";
import * as databaseConnector from "./databaseConnector";

const batchLoadFn: DataLoader.BatchLoadFn<string, Todo> = keys => {
  const set = new Set(keys);
  const data = databaseConnector.todoData
    .filter(({ id }) => set.has(id))
    .map(opts => new Todo(opts));

  return Promise.resolve(data);
};

export const dataloader = new DataLoader(batchLoadFn);

export const getAll = (): Promise<Todo[]> =>
  Promise.resolve(databaseConnector.todoData.map(opts => new Todo(opts)));

export const getById = (id: string): Promise<Todo> => dataloader.load(id);

export const getByIds = (ids: string[]): Promise<Todo[]> =>
  dataloader.loadMany(ids);
