import { connect } from "mongoose";

export async function ConnectDatabase() {
  try {
    await connect(process.env.MONGO_URL ?? "");
    console.log("conectado a la base de datos.");
  } catch (error) {
    console.log(`Ha ocurrido un error con la base de datos: ${error}`);
  }
}
