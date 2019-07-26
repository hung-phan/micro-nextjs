import { TodoModel } from "./domain/model";

export type TodoState = TodoModel.Todo[];

export const todoMountPoint = "todo";

export interface IApplicationState {
  [todoMountPoint]: TodoState;
}
