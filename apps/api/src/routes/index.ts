import { FastifyInstance, RouteOptions } from "fastify";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
import { transactionRoutes } from "./transaction";

const routes: RouteOptions[] = [
  ...authRoutes,
  ...userRoutes,
  ...transactionRoutes,
];

export const registerRoutes = (fastify: FastifyInstance) => {
  console.warn("registering routes", routes);
  routes.map((route) => {
    fastify.route(route);
  });
};
