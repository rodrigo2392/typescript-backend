import express from "express";
import { ConnectDatabase } from "./database";
import bodyParser from "body-parser";
import TodoRoutes from "./routes/todo-list.routes";

const port = 4000;

const app = express();
app.use(bodyParser.json());

app.use("/todos", TodoRoutes);

ConnectDatabase();

app.listen(port, () => {
  console.log(`servidor funcionando ${port}`);
});
