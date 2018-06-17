import * as next from "next";
import { ConfigManager } from "../infrastructure/service";

export default next({ dev: ConfigManager.NODE_ENV !== "production" });
