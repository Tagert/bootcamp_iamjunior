import { validateEnvVars } from "../utils/validations/env.validation";

const { PORT, MONGO_CONNECTION, DB_NAME, JWT_SECRET, JWT_EXPIRATION } = process.env;

const requiredEnvVars = {
  PORT,
  MONGO_CONNECTION,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRATION,
};

validateEnvVars(requiredEnvVars);

export const config = {
  server: {
    port: PORT as string,
  },
  jwt: {
    secret: JWT_SECRET as string,
    expiration: JWT_EXPIRATION as string,
  },
  jwt_refresh: {
    secret: JWT_SECRET as string,
    expiration: JWT_EXPIRATION as string,
  },
  db: {
    connection: MONGO_CONNECTION as string,
    name: DB_NAME as string,
  },
};
