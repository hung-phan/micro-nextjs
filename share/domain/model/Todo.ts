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
