import * as next from "next";
import { NODE_ENV } from "./config";

const app = next({ dev: NODE_ENV !== "production" });
const handler = app.getRequestHandler();

export { app, handler };
