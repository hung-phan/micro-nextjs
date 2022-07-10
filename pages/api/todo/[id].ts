import * as Boom from "boom";
import type { NextApiRequest, NextApiResponse } from "next";
import { assert, string } from "superstruct";

import { TodoRepository } from "../../../server/infrastructure/persistence";
import { TodoModel } from "../../../share/domain/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  assert(id, string());

  try {
    switch (method) {
      case "GET":
        res.status(200).json(await TodoRepository.getById(id));
        break
      case "PUT":
        assert(req.body, TodoModel.validator.TodoUpdate);

        res.status(200).json(await TodoRepository.update(id, req.body));
        break;
      case "DELETE":
        await TodoRepository.remove(id);

        res.status(204);
        res.end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    throw Boom.boomify(error, { statusCode: 400 });
  }
}
