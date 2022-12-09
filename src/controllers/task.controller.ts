import { Request, Response } from "express";
import httpStatus from "http-status";
import { incomingTask } from "../protocols";
import taskRepository from "../repositories/task.repository";

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await taskRepository.showTasks();
    res.status(httpStatus.OK).send(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function postTasks(req: Request, res: Response) {
  const { task } = req.body as incomingTask;

  if (!task || typeof task !== "string") {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  try {
    const newTask = await taskRepository.createTask(task);
    res.status(httpStatus.CREATED).send({ id: newTask.id });
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function putTasks(req: Request, res: Response) {
  const { task } = req.body as incomingTask;
  const taskId = Number(req.params.taskId);

  if (!task || typeof task !== "string" || Number.isNaN(taskId)) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }

  try {
    const task = await taskRepository.findTaskById(taskId);
    if (!task) return res.sendStatus(httpStatus.NOT_FOUND);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
