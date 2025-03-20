import jwt from "jsonwebtoken";

interface User {
  email: string;
  _id: string;
}

export async function Sign(value: User) {
  const secret = process.env.JWT_SECRET ?? "shhhhh";
  const token = jwt.sign(value, secret, {
    expiresIn: 60 * 60 * 60, //  1 hora
  });
  const refresh_token = jwt.sign({ token }, secret, {
    expiresIn: 60 * 60 * 60 * 24 * 30, // 30 dias
  });
  return {
    token,
    refresh_token,
  };
}

export async function ValidateToken(token: string) {
  const secret = process.env.JWT_SECRET ?? "shhhhh";
  const decoded = jwt.verify(token, secret);
  return decoded;
}
