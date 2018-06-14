import * as micro from "micro";
import { server, config } from "./infrastructure";
import { requestHandler } from "./application";

server.app.prepare().then(() => {
  micro(requestHandler).listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
});
