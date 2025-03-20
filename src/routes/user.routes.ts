import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.get);
router.post("/", UserController.create);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.remove);
router.get("/todos", UserController.getTodosByUser);

export default router;
