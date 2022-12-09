import prisma from "../config/database";
import dayjs from "dayjs";

async function showTasks() {
  return await prisma.tasks.findMany();
}

async function createTask(taskName: string) {
  return await prisma.tasks.create({
    data: {
      task: taskName,
      UpdatedAt: dayjs().format(),
    },
  });
}

async function findTaskById(taskId: number) {
  return await prisma.tasks.findFirst({
    where: {
      id: taskId,
    },
  });
}

const taskRepository = { showTasks, createTask, findTaskById };

export default taskRepository;
