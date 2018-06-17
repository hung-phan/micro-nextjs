import micro from "micro";
import { get, router, withNamespace } from "microrouter";
import * as next from "next";
import { configManager } from "../infrastructure/service";
import * as Todo from "./todo";

export const nextApplication = next({
  dev: configManager.NODE_ENV !== "production"
});

export const httpServer = micro(
  router(
    withNamespace("/api")(get("/todo", Todo.queryService.getAll)),
    get("/*", nextApplication.getRequestHandler())
  )
);
