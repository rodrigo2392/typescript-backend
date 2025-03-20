import "dotenv/config";
import express from "express";
import { ConnectDatabase } from "./database";
import bodyParser from "body-parser";
import TodoRoutes from "./routes/todo-list.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import { validateToken } from "./middlewares/jwt.middleware";

const port = process.env.PORT ?? 4000;

const app = express();
app.use(bodyParser.json());

app.use("/todos", validateToken, TodoRoutes);
app.use("/users", validateToken, UserRoutes);
app.use("/auth", AuthRoutes);

ConnectDatabase();

app.listen(port, () => {
  console.log(`servidor funcionando ${port}`);
});
