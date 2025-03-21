import UserModel from "../schemas/user.schema";
import TodoModel from "../schemas/todo-list.schema";
interface CreateTodoDTO {
  email: string;
  password: string;
  name: string;
  active?: boolean;
  verified?: boolean;
}

class UserRepository {
  async create(todo: CreateTodoDTO) {
    const addedUser = new UserModel(todo);
    return await addedUser.save();
  }

  async findAll() {
    const result = await UserModel.find({ active: true });
    return result;
  }

  async findById(_id: string) {
    const result = await UserModel.findOne({ _id, active: true });
    return result;
  }

  async findByEmail(email: string) {
    console.log({ email });
    const result = await UserModel.findOne({ email, active: true });
    return result;
  }

  async update(_id: string, todoChanges: Partial<CreateTodoDTO>) {
    const updatedItem = await UserModel.findOneAndUpdate(
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

  async delete(_id: string) {
    await UserModel.findOneAndUpdate(
      { _id },
      {
        active: false,
      },
    );
  }

  async getTodosByUser(user: string) {
    return TodoModel.find({ user });
  }
}

const userRepository = new UserRepository();

export default userRepository;
