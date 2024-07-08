import express from "express";
import "dotenv/config";
import { loadEnvConfig } from "./src/config/load-env.config.js";
import { configMiddleware } from "./src/config/middleware.config.js";
import { configRoutes } from "./src/config/routes.config.js";
import { connectToDatabase } from "./src/libs/connect-to-db.js";

const server = express();
const config = loadEnvConfig();

configMiddleware(server);

const startServer = async () => {
  await connectToDatabase();

  configRoutes(server);

  server.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express started on http://localhost:${config.port}`);
  });
};

startServer();
