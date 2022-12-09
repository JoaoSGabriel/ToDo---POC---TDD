import { Request, Response } from "express";
import httpStatus from "http-status";
import taskRepository from "../repositories/task.repository";

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await taskRepository.showTasks();
    res.status(httpStatus.OK).send(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
}
