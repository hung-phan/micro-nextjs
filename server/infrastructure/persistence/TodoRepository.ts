import * as DataLoader from "dataloader";
import * as faker from "faker";
import * as _ from "lodash";
import { TodoModel } from "../../../share/domain/model";

// fake data
let todoData: TodoModel.ITodo[] = _.range(10).map(() => ({
  id: faker.random.uuid(),
  complete: _.sample([true, false]),
  text: faker.lorem.sentence()
}));

const batchLoadFn: DataLoader.BatchLoadFn<string, TodoModel.Todo> = keys => {
  const set = new Set(keys);
  const data = todoData
    .filter(({ id }) => set.has(id))
    .map((opts: TodoModel.ITodo) => new TodoModel.Todo(opts));

  return Promise.resolve(data);
};

export const dataloader = new DataLoader(batchLoadFn);

export const getAll = (): Promise<TodoModel.Todo[]> =>
  Promise.resolve(
    todoData.map((opts: TodoModel.ITodo) => new TodoModel.Todo(opts))
  );

export const getById = (id: string): Promise<TodoModel.Todo> =>
  dataloader.load(id);

export const getByIds = (ids: string[]): Promise<TodoModel.Todo[]> =>
  dataloader.loadMany(ids);

export const create = (text: string): TodoModel.Todo => {
  const iTodo = {
    id: faker.random.uuid(),
    complete: false,
    text
  };

  todoData = todoData.concat([iTodo]);

  return new TodoModel.Todo(iTodo);
};

export const update = (id: string, updates: TodoModel.ITodoUpdate): TodoModel.Todo => {
  const iTodo = todoData.find((todo: TodoModel.ITodo) => id === todo.id);

  if (!iTodo) {
    throw new Error(`Cannot find Todo with given id: ${id}`);
  }

  Object.assign(iTodo, updates);

  dataloader.clear(id);

  return new TodoModel.Todo(iTodo);
};

export const remove = (id: string): void => {
  todoData = todoData.filter((todo: TodoModel.ITodo) => id !== todo.id);
  dataloader.clear(id);
};
