import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { createUserDto, UserSchema } from "@tap/entities";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET! ;

const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const register = async (info: createUserDto) => {
  const validation = createUserSchema.safeParse(info);
  if (!validation.success) {
    throw new Error(JSON.stringify(validation.error.format()));
  }

  const user = new UserSchema();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(info.password, saltRounds);

  user.name = info.name;
  user.email = info.email;
  user.password = hashedPassword;
  user.balance = 0;

  await user.save();

  // Generar el token JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
};
