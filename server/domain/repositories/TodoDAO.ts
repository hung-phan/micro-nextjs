import * as DataLoader from "dataloader";
import { database } from "../../infrastructure";
import { Todo } from "../models";

const dataloader = new DataLoader(
  (ids: string[]): Promise<Todo[]> => {
    const set: Set<string> = new Set(ids);

    return Promise.resolve(
      database.todoData
        .filter(({ id }) => set.has(id))
        .map(opts => new Todo(opts))
    );
  }
);

const count = (): number => database.todoData.length;

const all = (): Promise<Todo[]> =>
  Promise.resolve(database.todoData.map(opts => new Todo(opts)));

const getById = (id: string): Promise<Todo> => dataloader.load(id);

const getByIds = (ids: string[]): Promise<Todo[]> => dataloader.loadMany(ids);

export { count, all, getById, getByIds };
