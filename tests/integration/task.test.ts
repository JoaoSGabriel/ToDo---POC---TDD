import app from "../../src/app";
import supertest from "supertest";

const server = supertest(app);

describe("test de server", () => {
  it("GET: /tasks", async () => {
    const resultado = await server.get("/tasks");
  });
});
