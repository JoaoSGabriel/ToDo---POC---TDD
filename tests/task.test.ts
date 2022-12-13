import app from "../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import prisma from "../src/config/database";
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

describe("POST: /tasks", () => {
  it("should respond with status 400 if empty body", async () => {
    const newTask = {};

    const response = await server.post("/tasks").send(newTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if invalid body", async () => {
    const newTask = {
      task: 515,
    };

    const response = await server.post("/tasks").send(newTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 201 and net task data name", async () => {
    const newTask = {
      task: "Lavar a roupa",
    };

    const response = await server.post("/tasks").send(newTask);

    const task = await prisma.tasks.findFirst({
      where: {
        task: newTask.task,
      },
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({ id: task.id });
  });
});

describe("PUT /tasks/:taskId", () => {
  it("should respond with status 400 if empty body", async () => {
    const task = await newTask();
    const updateTask = {};

    const response = await server.put(`/tasks/${task.id}`).send(updateTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if invalid body", async () => {
    const task = await newTask();
    const updateTask = {
      task: 500,
    };

    const response = await server.put(`/tasks/${task.id}`).send(updateTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if invalid taskId", async () => {
    const updateTask = {
      task: "Lavar a roupa",
    };

    const response = await server.put(`/tasks/teste`).send(updateTask);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 404 if doesnt found the task to update", async () => {
    const updateTask = {
      task: "Lavar a roupa",
    };

    const response = await server.put(`/tasks/2`).send(updateTask);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and update select task data", async () => {
    const task = await newTask();
    const newTaskDescription = {
      task: "Lavar a roupa",
    };

    const response = await server
      .put(`/tasks/${task.id}`)
      .send(newTaskDescription);

    const updatedTask = await prisma.tasks.findFirst({
      where: {
        id: task.id,
      },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(updatedTask.task).toBe(newTaskDescription.task);
  });
});

describe("DELETE /tasks/:taskId", () => {
  it("should respond with status 400 if invalid taskId", async () => {
    const response = await server.delete(`/tasks/teste`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 404 if doesnt found the task to update", async () => {
    const response = await server.delete(`/tasks/2`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and exclude select task", async () => {
    const task = await newTask();

    const response = await server.delete(`/tasks/${task.id}`);

    const deletedTask = await prisma.tasks.findFirst({
      where: {
        id: task.id,
      },
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(deletedTask).toBe(null);
  });
});
