import { Request, Response } from "express";
import TodoService from "../services/todo-list.service";
import redisServer from "../services/redis.service";

class TodoController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }
  async invalidateCache() {
    const client = await redisServer.createServer();
    await client.del("todoList");
    await client.disconnect();
  }

  async get(req: Request, res: Response) {
    try {
      const client = await redisServer.createServer();
      const todosCache = await client.get("todoList");
      if (todosCache) {
        res.status(200).json({ cache: true, data: JSON.parse(todosCache) });
        await client.disconnect();
        return;
      }
      const user_id = req.headers.user_id as string;
      const todos = await TodoService.getAll(user_id);
      await client.set("todoList", JSON.stringify(todos));
      res.status(200).json({ cache: false, data: todos });
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { title, description, done } = req.body;
      const todos = await TodoService.create({
        title,
        description,
        done,
        user: user_id,
      });
      await this.invalidateCache();
      res.status(200).json({ data: todos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { id } = req.params;
      const { title, description, done } = req.body;

      const todos = await TodoService.update(id, user_id, {
        description,
        title,
        done,
      });
      await this.invalidateCache();
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { id } = req.params;
      await TodoService.remove(id, user_id);
      await this.invalidateCache();
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const todoController = new TodoController();

export default todoController;
