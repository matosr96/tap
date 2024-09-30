import { RouteOptions } from "fastify";
import { getTransactionHistory } from "@tap/services";

export const transactionHistoryRoute: RouteOptions = {
  method: "GET",
  url: "/account/history",
  handler: async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ error: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1];

      const result = await getTransactionHistory(token);
      reply.status(200).send(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          "Error al obtener el historial de transacciones:",
          err.message
        );
        reply.status(500).send({ error: err.message });
      }
    }
  },
};
