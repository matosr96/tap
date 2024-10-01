import jwt from "jsonwebtoken";
import { UserSchema } from "@tap/entities";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const getBalance = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await UserSchema.findOneBy({ id: decoded.id });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    console.log("Datos del usuario:", user);

    return { balance: user.balance };
  } catch (error) {
    console.log("Error al obtener el saldo: " + error);
  }
};
