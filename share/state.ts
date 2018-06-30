import { TodoModel } from "./domain/model";

export type TodoState = TodoModel.Todo[];

export const todoMountPoint = "todos";

export interface IApplicationState {
  [todoMountPoint]: TodoState;
}
