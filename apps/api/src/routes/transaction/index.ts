import { RouteOptions } from "fastify";
import { transferRoute } from "./transferRoute";
import { transactionHistoryRoute } from "./transactionHistoryRoute";

export const transactionRoutes: RouteOptions[] = [
  transferRoute,
  transactionHistoryRoute,
];
