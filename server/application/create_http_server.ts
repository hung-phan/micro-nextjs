import micro from "micro";
import { get, router, withNamespace } from "microrouter";
import ServerApplication from "./server_application";
import * as TodoApplication from "./todo";

const routes = router(
  withNamespace("/api")(
    get("/todo", TodoApplication.QueryService.getAll)
  ),
  get("/*", ServerApplication.getRequestHandler())
);

export default () => micro(routes);
