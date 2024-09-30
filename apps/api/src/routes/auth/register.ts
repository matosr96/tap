import { RouteOptions } from "fastify";
import { createUserDto } from "@tap/entities";
import { register } from "@tap/services";

export const signUpRoute: RouteOptions = {
  method: "POST",
  url: "/auth/signup",
  handler: async (request, reply) => {
    try {
      const { body } = request;
      const infoUser = body as createUserDto;
      const user = await register(infoUser);
      reply.status(200).send(user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        reply.status(500).send(err);
      }
    }
  },
};
