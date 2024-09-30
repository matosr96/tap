import { RouteOptions } from "fastify";
import { signUpRoute } from "./register";
import { signinRoute } from "./signin";

export const authRoutes: RouteOptions[] = [signUpRoute, signinRoute];
