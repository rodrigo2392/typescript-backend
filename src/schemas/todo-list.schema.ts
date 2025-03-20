import mongoose, { Document, model, Schema } from "mongoose";

export type TTodoList = {
  title: string;
  description: string;
  done: boolean;
  user: string;
};

export interface ITodoList extends TTodoList, Document {}

export const todoListSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const TodoList = model("todoList", todoListSchema);

export default TodoList;
