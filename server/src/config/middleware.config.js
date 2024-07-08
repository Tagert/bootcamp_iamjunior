import express from "express";
import cors from "cors";

export const configMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
};
