import { UserSchema } from "@tap/entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const signin = async (email: string, password: string) => {
  try {
    // Buscar al usuario por su email
    const user = await UserSchema.findOneBy({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // El token expira en 1 hora
    );

    return { user, token };
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error);
  }
};
