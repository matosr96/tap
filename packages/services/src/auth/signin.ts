import { UserSchema } from "@tap/entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const signin = async (email: string, password: string) => {
  try {
    const user = await UserSchema.findOneBy({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" } 
    );

    return { user, token };
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error);
  }
};
