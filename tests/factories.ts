import { faker } from "@faker-js/faker";
import prisma from "../src/config/database";

export async function newTask() {
  return await prisma.tasks.create({
    data: {
      task: faker.word.verb(),
    },
  });
}
