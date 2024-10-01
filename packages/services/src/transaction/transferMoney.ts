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

    if (sender.balance < amount) {
      throw new Error("Saldo insuficiente");
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    const transaction = new TransactionSchema();
    transaction.senderId = sender.id;
    transaction.recipientId = recipient.id;
    transaction.amount = amount;
    transaction.type = "transfer";
    transaction.createdAt = new Date();

    await transaction.save();

    return { message: "Transferencia realizada con éxito", transaction };
  } catch (error) {
    throw new Error("Error al realizar la transferencia: " + error);
  }
};
