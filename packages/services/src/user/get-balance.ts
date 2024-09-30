import jwt from "jsonwebtoken";
import { UserSchema } from "@tap/entities";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const getBalance = async (token: string) => {
  try {
    // Verificar el token JWT
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Buscar al usuario en la base de datos usando el id del token
    const user = await UserSchema.findOneBy({ id: decoded.id });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    console.log("Datos del usuario:", user);

    // Devolver el saldo del usuario
    return { balance: user.balance };
  } catch (error) {
    console.log("Error al obtener el saldo: " + error);
  }
};
