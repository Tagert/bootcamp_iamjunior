import express from "express";
import "dotenv/config";
import { configSwagger } from "./config/swagger/swagger.config";
import { configMiddleware } from "./config/middleware.config";
import { startServer } from "./libs/start-server";

const server = express();

configSwagger(server);
configMiddleware(server);

startServer(server);
