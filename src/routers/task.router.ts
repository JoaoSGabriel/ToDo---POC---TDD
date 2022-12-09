import { Router } from "express";
import { getTasks, postTasks, putTasks } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/tasks", getTasks);
taskRouter.post("/tasks", postTasks);
taskRouter.put("/tasks/:taskId", putTasks);

export default taskRouter;
