export const loadConfig = () => ({
  port: process.env.PORT || 3000,
  mongoConnection: process.env.MONGO_CONNECTION,
  dbName: process.env.DB_NAME,
});
