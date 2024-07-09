import express from "express";
import "dotenv/config";
import { configSwagger } from "./src/config/swagger/swagger.config.js";
import { configMiddleware } from "./src/config/middleware.config.js";
import { startServer } from "./src/libs/start-server.js";

const server = express();

configSwagger(server);
configMiddleware(server);

startServer(server);
