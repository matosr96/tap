import { RouteOptions } from "fastify";
import { getBalanceRoute } from "./get-balance";

export const userRoutes: RouteOptions[] = [getBalanceRoute];
