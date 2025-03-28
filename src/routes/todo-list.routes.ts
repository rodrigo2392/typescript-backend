import express from "express";
import TodoController from "../controllers/todo-list.controller";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { TodoListSchema } from "../dtos/todo-list.dto";

function getRouter() {
  const router = express.Router();
  router.get("/", TodoController.get);
  router.post("/", ValidateBody(TodoListSchema), TodoController.create);
  router.patch("/:id", TodoController.update);
  router.delete("/:id", TodoController.remove);
  return router;
}

export default getRouter();
