import "dotenv/config";
import express, { Express } from "express";
import bodyParser from "body-parser";
import TodoRoutes from "./routes/todo-list.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import { validateToken } from "./middlewares/jwt.middleware";
import { rateLimit } from "express-rate-limit";
import errorHandler from "./middlewares/errorHandler.middleware";

class Server {
  app: Express;
  constructor() {
    this.app = express();
  }
  startServer() {
    const port = process.env.PORT ?? 4000;
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.disable("x-powered-by");
    this.app.use(bodyParser.json());
    this.app.use(limiter);

    this.app.use("/todos", validateToken, TodoRoutes);
    this.app.use("/users", validateToken, UserRoutes);
    this.app.use("/auth", AuthRoutes);

    this.app.use(errorHandler);

    this.app.listen(port, () => {
      console.log(`servidor funcionando ${port}`);
    });
  }
}

const server = new Server();

export default server;
