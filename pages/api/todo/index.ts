import * as Boom from "boom";
import type { NextApiRequest, NextApiResponse } from "next";
import { assert } from "superstruct";

import { TodoRepository } from "../../../server/infrastructure/persistence";
import { TodoModel } from "../../../share/domain/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        res.status(200).json(await TodoRepository.getAll());
        break;
      case "POST":
        assert(req.body, TodoModel.validator.TodoCreate);

        res.status(201).json(await TodoRepository.create(req.body.text));
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }
}
