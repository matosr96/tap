import "dotenv/config";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerRoutes } from "../routes";
import fastifyRateLimit from "@fastify/rate-limit";
import { db } from "@tap/infraestructure";

const { PORT, HOST } = process.env;

const corsOptions = {
  origin: "*",
};

const main = async () => {
  await db.initialize();
  console.log("Conectado a la base de datos");

  const server = fastify({
    logger: true,
  });

  server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  server.register(fastifyCors, corsOptions);

  server.register(
    (instance, options, next) => {
      registerRoutes(instance);
      next();
    },
    { prefix: "api/v1" }
  );

  server.listen({ port: Number(PORT), host: HOST }, (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info(`Backend App is running at ${address}`);
    console.info("Press CTRL-C to stop");
  });
};

main();
