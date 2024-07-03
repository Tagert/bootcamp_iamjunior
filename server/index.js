import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { serviceRoutes } from "./src/routes/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      dbName: "IamJunior",
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Connection to DB failed:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();

  app.use(serviceRoutes);

  app.use((req, res) => {
    return res.status(404).json({ status: "Endpoint does not exist" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Express started on http://localhost:${process.env.PORT}`);
  });
};

startServer();
