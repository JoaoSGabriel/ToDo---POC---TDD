import { Router } from "express";
import { getTasks, postTasks } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/tasks", getTasks);
taskRouter.post("/tasks", postTasks);

export default taskRouter;
