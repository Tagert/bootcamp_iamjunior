import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { setupRoutes } from "./src/routes/setup.routes.js";
import { loadConfig } from "./src/config/load-config.js";

const server = express();
const config = loadConfig();

server.use(cors());
server.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongoConnection, {
      dbName: config.dbName,
    });
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  } catch (err) {
    console.error("Connection to DB failed:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();

  setupRoutes(server);

  server.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express started on http://localhost:${config.port}`);
  });
};

startServer();
