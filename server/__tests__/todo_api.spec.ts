import * as request from "supertest";
import { utils } from "../helpers";

describe("todo_api", () => {
  it("should return 10 elements of Todo", () => {
    return request(utils.createServer())
      .get("/api/todo")
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).toEqual(10);
      });
  });
});
