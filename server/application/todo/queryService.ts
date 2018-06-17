import { MicroIncomingMessage, ServerResponse } from "http";
import { send } from "micro";
import { TodoRepository } from "../../infrastructure/persistence";

export const getAll = async (_: MicroIncomingMessage, res: ServerResponse) => {
  send(res, 200, await TodoRepository.getAll());
};

export const getById = async (req: MicroIncomingMessage, res: ServerResponse) => {
  send(res, 200, await TodoRepository.getById(req.params.id));
};
