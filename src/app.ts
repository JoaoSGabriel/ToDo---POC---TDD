import express from "express";

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).send("Hey, I'm alive!");
});

app.listen(4000, () => console.log("I'm working on port 4000!"));
