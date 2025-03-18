import express from "express";
import TodoController from "../controllers/todo-list.controller";

const router = express.Router();

router.get("/", TodoController.get);
router.post("/", TodoController.create);
router.patch("/:id", TodoController.update);
router.delete("/:id", TodoController.remove);

export default router;
