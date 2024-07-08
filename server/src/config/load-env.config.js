const { PORT, MONGO_CONNECTION, DB_NAME, JWT_SECRET, JWT_EXPIRATION } = process.env;

export const loadEnvConfig = () => ({
  port: PORT,
  mongoConnection: MONGO_CONNECTION,
  dbName: DB_NAME,
});

// const config = {
//   server: {
//     port: PORT,
//   },
//   jwt: {
//     secret: JWT_SECRET,
//     expiration: JWT_EXPIRATION,
//   },
//   db: {
//     connection: MONGO_CONNECTION,
//     name: DB_NAME,
//   },
// };
