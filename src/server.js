import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";
import Bullboard from "bull-board";
import Queue from "./app/lib/Queue";

const port = process.env.PORT;
const app = express();
Bullboard.setQueues(Queue.queues.map((queue) => queue.bull));

app.use(express.json());
app.use("/admin/queues", Bullboard.UI);

app.post("/user", UserController.store);

app.listen(port, () => {
  console.log(`Server running on the ${port}`);
});
