import express from "express";
import { GET_ALL_BUSINESSES } from "../controllers/business.controller.js";

export const businessRoutes = express.Router();

businessRoutes.get("/businesses", GET_ALL_BUSINESSES);

businessRoutes.get("/businesses/category/:category");

businessRoutes.get("/business/:id");

businessRoutes.post("/business");

businessRoutes.put("/business/:id");
