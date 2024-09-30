import { RouteOptions } from "fastify";
import { getBalance } from "@tap/services"; // Importa el servicio de obtener balance

export const getBalanceRoute: RouteOptions = {
  method: "GET",
  url: "/account/balance",
  handler: async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ error: "Token no proporcionado" });
      }

      const token = authHeader.split(" ")[1];

      // Llamar al servicio para obtener el balance
      const balance = await getBalance(token);

      // Devolver el balance al usuario
      reply.status(200).send(balance);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al obtener el balance:", err.message);
        reply.status(500).send({ error: err.message });
      }
    }
  },
};
