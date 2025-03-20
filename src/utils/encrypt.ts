import bcrypt from "bcrypt";

const saltRounds = 10;

export async function encrypt(value: string) {
  const result = await bcrypt.hash(value, saltRounds);
  return result;
}

export async function compare(value: string, hash: string) {
  const result = await bcrypt.compare(value, hash);
  return result;
}
