import * as micro from "micro";
import { requestHandler } from "./application";
import { config, server } from "./infrastructure";

server.app.prepare().then(() => {
  micro(requestHandler).listen(config.PORT, err => {
    if (err) {
      throw err;
    }

    // tslint:disable-next-line
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
});
