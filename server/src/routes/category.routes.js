import express from "express";
import { GET_ALL_CATEGORIES, INSERT_CATEGORY } from "../controllers/category.controller";

export const categoryRoutes = express.Router();

categoryRoutes.get("/categories", GET_ALL_CATEGORIES);

categoryRoutes.post("/categories", INSERT_CATEGORY);
