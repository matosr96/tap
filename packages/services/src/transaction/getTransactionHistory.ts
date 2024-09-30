import { TransactionSchema } from "@tap/entities";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const getTransactionHistory = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const transactions = await TransactionSchema.find({
      where: [{ senderId: decoded.id }, { recipientId: decoded.id }],
      order: { createdAt: "DESC" },
    });
    return { transactions };
  } catch (error) {
    throw new Error("Error al obtener el historial de transacciones: " + error);
  }
};
