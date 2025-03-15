import TodoListModel, { TTodoList } from "./todoList";

export async function listItems() {
  const result = await TodoListModel.find();
  return result;
}

export async function createItem(todo: TTodoList) {
  const addedTodo = new TodoListModel(todo);
  return await addedTodo.save();
}

export async function updateItem(_id: string, todoChanges: Partial<TTodoList>) {
  const updatedItem = await TodoListModel.findOneAndUpdate(
    { _id },
    {
      $set: todoChanges,
    },
    {
      new: true,
    },
  );

  return updatedItem;
}

export async function removeItem(_id: string) {
  await TodoListModel.findOneAndDelete({ _id });
}
