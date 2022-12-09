import prisma from "../src/config/database";

export async function cleanDB() {
  await prisma.tasks.deleteMany({});
}
