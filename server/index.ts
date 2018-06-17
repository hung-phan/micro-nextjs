import { httpServer, nextApplication } from "./application";
import { configManager } from "./infrastructure/service";

nextApplication.prepare().then(() => {
  httpServer.listen(configManager.PORT, err => {
    if (err) {
      throw err;
    }

    // tslint:disable-next-line
    console.log(`> Ready on http://localhost:${configManager.PORT}`);
  });
});
