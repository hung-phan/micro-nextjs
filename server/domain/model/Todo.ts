export default class Todo {
  public id: string;
  public text: string;
  public complete: boolean;

  constructor({
    id,
    text,
    complete
  }: {
    id: string;
    text: string;
    complete: boolean;
  }) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}
