import { Request, Response } from "express";
import UserService from "../services/user.service";
import { ValidateToken } from "../utils/jwt.util";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(401).json({ error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      await UserService.create({
        email,
        name,
        password,
      });
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const header = req.header("Authorization") || "";
      const old_token = header.split(" ")[1];
      const { refresh_token } = req.body;
      const actual_token = (await ValidateToken(refresh_token)) as {
        token: string;
      };
      const user = (await ValidateToken(actual_token.token)) as {
        _id: string;
        email: string;
      };

      console.log({ user });
      if (actual_token.token === old_token) {
        const newtoken = await UserService.refreshToken({
          _id: user._id,
          email: user.email,
        });

        res.status(200).json(newtoken);
      } else {
        res.status(404).json({ error: "el token no corresponde" });
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}

const authController = new AuthController();
export default authController;
