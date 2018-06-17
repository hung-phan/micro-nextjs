import { IncomingMessage, ServerResponse } from "http";
import { send } from "micro";
import { TodoRepository } from "../../infrastructure/persistence";

export const getAll = async (_: IncomingMessage, res: ServerResponse) => {
  send(res, 200, await TodoRepository.all());
};
