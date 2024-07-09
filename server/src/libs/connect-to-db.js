import mongoose from "mongoose";
import { config } from "../config/load-env.config.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.db.connection, {
      dbName: config.db.name,
    });
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
  } catch (err) {
    console.error("Connection to DB failed:", err);
    process.exit(1);
  }
};
