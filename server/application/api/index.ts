import { withNamespace } from "microrouter";
import todoRoutes from "./todo";

export default [withNamespace("/api")(...todoRoutes)];
