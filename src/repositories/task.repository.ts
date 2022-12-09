import prisma from "../config/database";

async function showTasks() {
  return await prisma.tasks.findMany();
}

const taskRepository = { showTasks };

export default taskRepository;
