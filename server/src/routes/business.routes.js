import express from "express";
import {
  GET_ALL_BUSINESSES,
  GET_BUSINESSES_BY_CATEGORY,
  INSERT_BUSINESS,
  GET_BUSINESS_BY_ID,
  UPDATE_BUSINESS_BY_ID,
} from "../controllers/business.controller.js";

export const businessRoutes = express.Router();

businessRoutes.get("/businesses", GET_ALL_BUSINESSES);

businessRoutes.get("/businesses/category/:category", GET_BUSINESSES_BY_CATEGORY);

businessRoutes.get("/business/:id", GET_BUSINESS_BY_ID);

businessRoutes.post("/business", INSERT_BUSINESS);

businessRoutes.put("/business/:id", UPDATE_BUSINESS_BY_ID);