import * as Boom from "boom";
import { MicroIncomingMessage, ServerResponse } from "http";
import { json, send } from "micro";
import { TodoModel } from "../../../share/domain/model";
import { TodoRepository } from "../../infrastructure/persistence";

export const create = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  let text;

  try {
    text = TodoModel.validator.TodoCreate(await json(req)).text;
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }

  return send(res, 201, await TodoRepository.create(text));
};

export const getAll = async (_: MicroIncomingMessage, res: ServerResponse) => {
  return send(res, 200, await TodoRepository.getAll());
};

export const getById = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  return send(res, 200, await TodoRepository.getById(req.params.id));
};

export const update = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  let updates;

  try {
    updates = TodoModel.validator.TodoUpdate(await json(req));
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }

  return send(res, 200, await TodoRepository.update(req.params.id, updates));
};

export const remove = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  return send(res, 204, await TodoRepository.remove(req.params.id));
};
