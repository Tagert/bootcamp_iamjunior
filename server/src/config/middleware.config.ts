import express from "express";
import cors from "cors";
import type { Express } from "express";

export const configMiddleware = (app: Express) => {
  app.use(cors());
  app.use(express.json());
};
