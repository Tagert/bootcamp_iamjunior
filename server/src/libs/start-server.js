import { config } from "../config/load-env.config.js";
import { configRoutes } from "../config/routes.config.js";
import { connectToDatabase } from "../libs/connect-to-db.js";

export const startServer = async (server) => {
  await connectToDatabase();

  configRoutes(server);

  server.listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express started on http://localhost:${config.server.port}`);
    // eslint-disable-next-line no-console
    console.log(`Swagger UI available at http://localhost:${config.server.port}/api-docs`);
  });
};
