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

  if (!task) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  try {
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
