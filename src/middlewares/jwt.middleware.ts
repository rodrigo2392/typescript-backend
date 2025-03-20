import { Request, Response, NextFunction } from "express";
import { ValidateToken } from "../utils/jwt.util";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const user = (await ValidateToken(token)) as { _id: string };
    if (!user._id) {
      res.status(403).json({ error: "Usuario no autenticado" });
    }
    req.headers.user_id = user._id;
    next();
  } catch (err) {
    res.status(403).json({ error: "Usuario no autenticado", details: err });
  }
}
