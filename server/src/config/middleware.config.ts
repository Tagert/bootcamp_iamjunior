import express from "express";
import cors from "cors";
import type { Express } from "express";
import path from "path";

export const configMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json());

  app.use(express.json({ limit: "50mb" }));
  app.use(express.static(path.join(__dirname, "../../client/dist")));
};
