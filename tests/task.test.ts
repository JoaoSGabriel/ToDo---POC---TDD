import app from "../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDB } from "./helper";
import { newTask } from "./factories";

const server = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

describe("GET /status", () => {
  it("should respond with status 200 and 'Hey, I'm alive!'", async () => {
    const response = await server.get("/status");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe("Hey, I'm alive!");
  });
});

describe("GET: /tasks", () => {
  it("should respond with status 200 and tasks data", async () => {
    const task = await newTask();
    const response = await server.get("/tasks");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: task.id,
        task: task.task,
        createdAt: task.createdAt.toISOString(),
        UpdatedAt: task.UpdatedAt,
      },
    ]);
  });
});

describe("GET: /tasks", () => {
  it("should respond with status 400 if invalid body", async () => {
    const newTask = {};

    const response = await server.post("/tasks").send(newTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});
