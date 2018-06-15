import { createHTTPServer, ServerApplication } from "./application";
import { ConfigManager } from "./infrastructure/service";

ServerApplication.prepare().then(() => {
  createHTTPServer().listen(ConfigManager.PORT, err => {
    if (err) {
      throw err;
    }

    // tslint:disable-next-line
    console.log(`> Ready on http://localhost:${ConfigManager.PORT}`);
  });
});
