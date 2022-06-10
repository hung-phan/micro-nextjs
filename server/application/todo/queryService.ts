import * as Boom from "boom";
import { MicroIncomingMessage, ServerResponse } from "http";
import { json, send } from "micro";
import { assert } from "superstruct";

import { TodoModel } from "../../../share/domain/model";
import { TodoRepository } from "../../infrastructure/persistence";

export const create = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  let createReq;

  try {
    createReq = await json(req);

    assert(createReq, TodoModel.validator.TodoCreate);
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }

  return send(res, 201, await TodoRepository.create(createReq.text));
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
  let updateReq;

  try {
    updateReq = await json(req);

    assert(updateReq, TodoModel.validator.TodoUpdate);
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }

  return send(res, 200, await TodoRepository.update(req.params.id, updateReq));
};

export const remove = async (
  req: MicroIncomingMessage,
  res: ServerResponse
) => {
  return send(res, 204, await TodoRepository.remove(req.params.id));
};
