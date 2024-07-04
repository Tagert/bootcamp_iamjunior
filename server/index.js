import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { categoryRoutes } from "./src/routes/category.routes.js";
import { bookingRoutes } from "./src/routes/booking.routes.js";
import { businessRoutes } from "./src/routes/business.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";

const server = express();

server.use(cors());
server.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      dbName: "IamJunior",
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

  server.use(categoryRoutes);
  server.use(bookingRoutes);
  server.use(businessRoutes);
  server.use(userRoutes);

  server.use((req, res) => {
    return res.status(404).json({ status: "Endpoint does not exist" });
  });

  server.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Express started on http://localhost:${process.env.PORT}`);
  });
};

startServer();
