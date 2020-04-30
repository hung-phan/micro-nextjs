import request from "supertest";
import { TodoModel } from "../../share/domain/model";
import { httpServer } from "../application";

let todo: TodoModel.ITodo;

beforeAll(() => {
  return request(httpServer)
    .post("/api/todo")
    .send({ text: "New Todo" })
    .set("Accept", "application/json")
    .then(res => {
      todo = res.body;
    });
});

test(".getAll()", () => {
  return request(httpServer)
    .get("/api/todo")
    .set("Accept", "application/json")
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
    });
});

test(".getById()", () => {
  return request(httpServer)
    .get(`/api/todo/${todo.id}`)
    .set("Accept", "application/json")
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
    });
});

test(".update()", () => {
  return request(httpServer)
    .put(`/api/todo/${todo.id}`)
    .send({ text: "Newer Todo", complete: true })
    .set("Accept", "application/json")
    .expect(200)
    .then(res => {
      expect(res.body).toEqual({
        id: todo.id,
        text: "Newer Todo",
        complete: true
      });
    });
});

test(".remove()", () => {
  return request(httpServer)
    .del(`/api/todo/${todo.id}`)
    .set("Accept", "application/json")
    .expect(204)
    .then(res => {
      expect(res.body).toEqual({});
    });
});
