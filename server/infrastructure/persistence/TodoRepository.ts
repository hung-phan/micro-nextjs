import * as DataLoader from "dataloader";
import { Todo } from "../../domain/model";
import * as databaseConnector from "./databaseConnector";

export const dataloader = new DataLoader(
  (ids: string[]): Promise<Todo[]> => {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      databaseConnector.todoData
        .filter(({ id }) => set.has(id))
        .map(opts => new Todo(opts))
    );
  }
);

export const count = (): number => databaseConnector.todoData.length;

export const all = (): Promise<Todo[]> =>
  Promise.resolve(databaseConnector.todoData.map(opts => new Todo(opts)));

export const getById = (id: string): Promise<Todo> => dataloader.load(id);

export const getByIds = (ids: string[]): Promise<Todo[]> => dataloader.loadMany(ids);
