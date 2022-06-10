import { boolean, object, optional, string } from "superstruct";

import IEntity from "../IEntity";

export interface ITodo extends IEntity {
  text: string;
  complete: boolean;
}

export interface ITodoUpdate {
  text?: string;
  complete?: boolean;
}

export class Todo implements ITodo {
  public id?: string;
  public text: string;
  public complete: boolean;

  constructor({ id, text, complete }: ITodo) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}

export const validator = {
  TodoCreate: object({
    text: string(),
  }),
  TodoUpdate: object({
    text: optional(string()),
    complete: optional(boolean()),
  }),
};
