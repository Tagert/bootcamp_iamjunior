import mongoose from "mongoose";
import { loadEnvConfig } from "../config/load-env.config.js";

const config = loadEnvConfig();

export const connectToDatabase = async () => {
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
