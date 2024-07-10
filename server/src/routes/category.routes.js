import express from "express";
import { GET_ALL_CATEGORIES, INSERT_CATEGORY } from "../controllers/category/index.js";

export const categoryRoutes = express.Router();

categoryRoutes.get("/categories", GET_ALL_CATEGORIES);

categoryRoutes.post("/category", INSERT_CATEGORY);
