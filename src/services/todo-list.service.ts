import TodoRepository from "../repository/todo-list.schema";

interface CreateTodoDTO {
  title: string;
  description: string;
  done: boolean;
  user: string;
}

class TodoService {
  async getAll(user_id: string) {
    return await TodoRepository.findAll(user_id);
  }

  async getById(id: string) {
    return TodoRepository.findById(id);
  }

  async create(createDTO: CreateTodoDTO) {
    return TodoRepository.create(createDTO);
  }

  async update(_id: string, user: string, updateDTO: Partial<CreateTodoDTO>) {
    return TodoRepository.update(_id, user, updateDTO);
  }

  async remove(id: string, user: string) {
    return TodoRepository.delete(id, user);
  }
}

const todoService = new TodoService();

export default todoService;
