import { struct } from "superstruct";

export interface ITodo {
  id?: string;
  text: string;
  complete: boolean;
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

export interface ITodoUpdate {
  text?: string;
  complete?: boolean;
}

export const validator = {
  Todo: struct({
    id: "string?",
    text: "string",
    complete: "boolean"
  }),
  TodoUpdate: struct({
    text: "string?",
    complete: "boolean?"
  })
};
