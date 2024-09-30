import { UserSchema, TransactionSchema } from "@tap/entities";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const transferMoney = async (
  token: string,
  recipientEmail: string,
  amount: number
) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const sender = await UserSchema.findOneBy({ id: decoded.id });
    if (!sender) {
      throw new Error("Usuario remitente no encontrado");
    }

    const recipient = await UserSchema.findOneBy({ email: recipientEmail });
    if (!recipient) {
      throw new Error("Usuario destinatario no encontrado");
    }

    // Validar que el remitente tenga saldo suficiente
    if (sender.balance < amount) {
      throw new Error("Saldo insuficiente");
    }

    // Realizar la transferencia: Descontar saldo al remitente y agregar saldo al destinatario
    sender.balance -= amount;
    recipient.balance += amount;

    // Guardar los cambios en la base de datos
    await sender.save();
    await recipient.save();

    // Registrar la transacción en la base de datos
    const transaction = new TransactionSchema();
    transaction.senderId = sender.id; // Asignar senderId correctamente
    transaction.recipientId = recipient.id; // Asignar recipientId correctamente
    transaction.amount = amount;
    transaction.type = "transfer"; // Tipo de transacción
    transaction.createdAt = new Date();

    // Guardar la transacción en la base de datos
    await transaction.save();

    return { message: "Transferencia realizada con éxito", transaction };
  } catch (error) {
    throw new Error("Error al realizar la transferencia: " + error);
  }
};
