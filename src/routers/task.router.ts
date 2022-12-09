import { Router } from "express";
import { getTasks } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/tasks", getTasks);

export default taskRouter;
