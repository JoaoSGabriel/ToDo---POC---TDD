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
    const selectTask = await taskRepository.findTaskById(taskId);
    if (!selectTask) return res.sendStatus(httpStatus.NOT_FOUND);

    await taskRepository.updateTask(taskId, task);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const taskId = Number(req.params.taskId);

  if (Number.isNaN(taskId)) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }

  try {
    const selectTask = await taskRepository.findTaskById(taskId);
    if (!selectTask) return res.sendStatus(httpStatus.NOT_FOUND);

    await taskRepository.deleteTaskById(taskId);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    res.sendStatus(500);
  }
}
