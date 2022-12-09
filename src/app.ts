import express from "express";
import taskRouter from "./routers/task.router";

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).send("Hey, I'm alive!");
});

app.use(taskRouter);

app.listen(4000, () => console.log("I'm working on port 4000!"));

export default app;
