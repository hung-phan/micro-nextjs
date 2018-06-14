import micro from "micro";
import { requestHandler } from "../application";

const createServer = () => micro(requestHandler);

export { createServer };
