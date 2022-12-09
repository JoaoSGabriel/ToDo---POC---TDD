import app from "../src/app";
import httpStatus from "http-status";
import supertest from "supertest";

const server = supertest(app);

describe("GET /status", () => {
  it("should respond with status 200 and 'Hey, I'm alive!'", async () => {
    const response = await server.get("/status");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe("Hey, I'm alive!");
  });
});

describe("test de server", () => {
  it("GET: /tasks", async () => {
    const resultado = await server.get("/tasks");
  });
});
