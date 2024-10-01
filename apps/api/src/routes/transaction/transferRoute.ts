import { RouteOptions } from "fastify";
import { transferMoney } from "@tap/services";

export const transferRoute: RouteOptions = {
  method: "POST",
  url: "/account/transfer",
  handler: async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ error: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1];
      const { recipientEmail, amount } = request.body as {
        recipientEmail: string;
        amount: number;
      };

      if (!recipientEmail || !amount) {
        return reply
          .status(400)
          .send({ error: "Email del destinatario y monto son requeridos" });
      }

      const result = await transferMoney(token, recipientEmail, amount);
      reply.status(200).send(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al realizar la transferencia:", err.message);
        reply.status(500).send({ error: err.message });
      }
    }
  },
};
