import express from "express";
import taskRouter from "./routers/task.router";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).send("Hey, I'm alive!");
});

app.use(taskRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

export default app;
