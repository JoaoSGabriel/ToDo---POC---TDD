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

async function updateTask(taskId: number, taskText: string) {
  return await prisma.tasks.update({
    where: {
      id: taskId,
    },
    data: {
      task: taskText,
      UpdatedAt: dayjs().format(),
    },
  });
}

const taskRepository = { showTasks, createTask, findTaskById, updateTask };

export default taskRepository;
