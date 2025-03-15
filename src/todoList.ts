import { Document, model, Schema } from "mongoose";

export type TTodoList = {
  title: string;
  description: string;
  done: boolean;
};

export interface ITodoList extends TTodoList, Document {}

const todoListSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const TodoList = model("todoList", todoListSchema);

export default TodoList;
