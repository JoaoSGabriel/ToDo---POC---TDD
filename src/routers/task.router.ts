import { Router } from "express";
import {
  deleteTask,
  getTasks,
  postTasks,
  putTasks,
} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/tasks", getTasks);
taskRouter.post("/tasks", postTasks);
taskRouter.put("/tasks/:taskId", putTasks);
taskRouter.delete("/tasks/:taskId", deleteTask);

export default taskRouter;
