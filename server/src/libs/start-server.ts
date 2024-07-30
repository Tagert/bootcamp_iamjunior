import type { Express } from "express";
import { config } from "../config/load-env.config.js";
import { configRoutes } from "../config/routes.config.js";
import { connectToDatabase } from "../libs/connect-to-db.js";
import path from "path";

export const startServer = async (server: Express) => {
  await connectToDatabase();

  configRoutes(server);

  server.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });

  server.listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express started on http://localhost:${config.server.port}`);
    // eslint-disable-next-line no-console
    console.log(`Swagger UI available at http://localhost:${config.server.port}/api-docs`);
  });
};
