import { Request, Response } from "express";
import UserService from "../services/user.service";
import { ValidateToken } from "../utils/jwt.util";
import { compare } from "../utils/encrypt";
import OtpService from "../services/otp.service";
import otpRepository from "../repository/otp.repository";

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
      await OtpService.create(email);
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

  async generateNewOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await OtpService.create(email);
      res.status(200).json({ data: "ok" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async validateOTP(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const user = await UserService.getByEmail(email);
      if (!user) {
        res.status(404).json({ error: "user not found" });
      }

      const found = await otpRepository.find(email);
      if (!found) {
        res.status(404).json({ error: "code not found" });
      }
      const isValid = await compare(code, found.code ?? "");

      if (!isValid) {
        res.status(403).json({ error: "code not correct" });
      }

      await UserService.update(user?._id.toString() ?? "", {
        verified: true,
      });

      res.status(200).json({ data: "user verified" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const authController = new AuthController();
export default authController;
