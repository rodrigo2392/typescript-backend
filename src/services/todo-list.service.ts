import TodoRepository from "../repository/todo-list.schema";

interface CreateTodoDTO {
  title: string;
  description: string;
  done: boolean;
}

class TodoService {
  async getAll() {
    return TodoRepository.findAll();
  }

  async getById(id: string) {
    return TodoRepository.findById(id);
  }

  async create(createDTO: CreateTodoDTO) {
    return TodoRepository.create(createDTO);
  }

  async update(_id: string, updateDTO: Partial<CreateTodoDTO>) {
    return TodoRepository.update(_id, updateDTO);
  }

  async remove(id: string) {
    return TodoRepository.delete(id);
  }
}

const todoService = new TodoService();

export default todoService;
