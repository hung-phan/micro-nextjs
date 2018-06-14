import listen from "test-listen";
import { createServer } from "../helpers/utils";

describe("todo_api", () => {
  it("should expose todo api", async () => {
    const serverUrl = await listen(createServer());

    console.log(serverUrl);
  });
});
