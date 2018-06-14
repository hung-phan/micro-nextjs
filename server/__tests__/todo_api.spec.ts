import * as listen from "test-listen";
import { utils } from "../helpers";

describe("todo_api", () => {
  it("should expose todo api", async () => {
    const serverUrl = await listen(utils.createServer());

    console.log(serverUrl);
  });
});
