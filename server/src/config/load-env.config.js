import { validateEnvVars } from "../utils/validations/env.validation.js";

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
    port: PORT,
  },
  jwt: {
    secret: JWT_SECRET,
    expiration: JWT_EXPIRATION,
  },
  db: {
    connection: MONGO_CONNECTION,
    name: DB_NAME,
  },
};
