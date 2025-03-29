import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import TodoRoutes from "./routes/todo-list.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import { validateToken } from "./middlewares/jwt.middleware";
import { rateLimit } from "express-rate-limit";
import errorHandler from "./middlewares/errorHandler.middleware";
import cors from "cors";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export default function CreateServer() {
  const app = express();
  app.use(cors());
  app.disable("x-powered-by");
  app.use(bodyParser.json());
  app.use(limiter);
  app.get("/", (req, res) => {
    res.json({
      message: "Desplegado a producción",
    });
  });
  app.use("/todos", TodoRoutes);
  app.use("/users", validateToken, UserRoutes);
  app.use("/auth", AuthRoutes);
  app.use(errorHandler);
  return app;
}
