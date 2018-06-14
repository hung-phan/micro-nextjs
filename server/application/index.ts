import { get, router } from "microrouter";
import { server } from "../infrastructure";
import apiRoutes from "./api";

const requestHandler = router(...apiRoutes, get("/*", server.handler));

export { requestHandler };
