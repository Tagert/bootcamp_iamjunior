import express from "express";

export const categoryRoutes = express.Router();

categoryRoutes.get("/categories");

categoryRoutes.post("/categories");
