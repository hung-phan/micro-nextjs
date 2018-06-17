import micro from "micro";
import { get, router, withNamespace } from "microrouter";
import NextApplication from "./next_application";
import * as TodoApplication from "./todo";

const routes = router(
  withNamespace("/api")(
    get("/todo", TodoApplication.QueryService.getAll)
  ),
  get("/*", NextApplication.getRequestHandler())
);

export default () => micro(routes);
