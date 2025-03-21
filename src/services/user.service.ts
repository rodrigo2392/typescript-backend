import UserRepository from "../repository/user.repository";
import { encrypt, compare } from "../utils/encrypt";
import { Sign } from "../utils/jwt.util";
interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  active?: boolean;
  verified?: boolean;
}

class UserService {
  async getAll() {
    return UserRepository.findAll();
  }

  async getById(id: string) {
    return UserRepository.findById(id);
  }

  async getByEmail(email: string) {
    return UserRepository.findByEmail(email);
  }

  async create(createDTO: CreateUserDTO) {
    const hashed = await encrypt(createDTO.password);
    return UserRepository.create({
      ...createDTO,
      password: hashed,
    });
  }

  async update(_id: string, updateDTO: Partial<CreateUserDTO>) {
    return UserRepository.update(_id, updateDTO);
  }

  async remove(id: string) {
    return UserRepository.delete(id);
  }

  async getTodosByUser(user: string) {
    return UserRepository.getTodosByUser(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("user not found");
    }
    const correct = await compare(password, user.password ?? "");
    if (!correct) {
      throw new Error("incorrect user/password");
    }

    const token = await Sign({
      _id: user._id.toString() ?? "",
      email: user.email ?? "",
    });

    return token;
  }

  async refreshToken(user: { _id: string; email: string }) {
    try {
      const token = await Sign(user);
      console.log(token);
      return token;
    } catch (err) {
      console.log({ err });
    }
  }
}

const userService = new UserService();

export default userService;
