import { httpServer, nextApplication } from "./application";
import { configManager } from "./infrastructure/service";

nextApplication.prepare().then(() => {
  httpServer.listen(configManager.PORT, () => {
    console.log(`> Ready on http://localhost:${configManager.PORT}`);
  });
});
