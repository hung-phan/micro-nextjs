import { IncomingMessage, ServerResponse } from "http";
import { send } from "micro";
import { get } from "microrouter";
import { TodoDAO } from "../../domain/repositories";

export default [
  get("/todo", async (_: IncomingMessage, res: ServerResponse) => {
    send(res, 200, await TodoDAO.all());
  })
];
