import { struct } from "superstruct";
import IEntity from "../Entity";

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
  Todo: struct({
    id: "string?",
    text: "string",
    complete: "boolean"
  }),
  TodoCreate: struct({
    text: "string"
  }),
  TodoUpdate: struct({
    text: "string?",
    complete: "boolean?"
  })
};
