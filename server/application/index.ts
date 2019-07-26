import micro from "micro";
import { handleErrors } from "micro-boom";
import { del, get, post, put, router, withNamespace } from "microrouter";
import next from "next";
import { configManager } from "../infrastructure/service";
import * as Todo from "./todo";

export const nextApplication = next({
  dev: configManager.NODE_ENV !== "production"
});

export const httpServer = micro(
  handleErrors(
    router(
      withNamespace("/api/todo")(
        post("/", Todo.queryService.create),
        get("/", Todo.queryService.getAll),
        get("/:id", Todo.queryService.getById),
        put("/:id", Todo.queryService.update),
        del("/:id", Todo.queryService.remove),
      ),

      // offline caching
      get("/service-worker.js", (req, res) =>
        nextApplication.serveStatic(req, res, `${process.cwd()}/.next/service-worker.js`)
      ),

      // SPA
      get("/*", nextApplication.getRequestHandler())
    )
  )
);
