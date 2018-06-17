import * as request from "supertest";
import { httpServer } from "../../application";

describe("Todo.queryService", () => {
  it("/api/todo", () => {
    return request(httpServer)
      .get("/api/todo")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toBeDefined();
      });
  });

  it("/api/todo/0", () => {
    return request(httpServer)
      .get("/api/todo/0")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toBeDefined();
      });
  });
});
