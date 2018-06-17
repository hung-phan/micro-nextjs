import * as request from "supertest";
import { httpServer } from "../../application";

describe("Todo.queryService", () => {
  it("should return 10 elements of Todo", () => {
    return request(httpServer)
      .get("/api/todo")
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).toEqual(10);
      });
  });
});
