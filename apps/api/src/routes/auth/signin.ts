import { RouteOptions } from "fastify";
import { signin } from "@tap/services";

export const signinRoute: RouteOptions = {
  method: "POST",
  url: "/auth/signin",
  handler: async (request, reply) => {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return reply
          .status(400)
          .send({ error: "Email y contraseña son requeridos" });
      }

      const result = await signin(email, password);
      reply.status(200).send(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al iniciar sesión:", err.message);
        reply.status(500).send({ error: err.message });
      }
    }
  },
};
