import express from "express";
import {
  GET_ALL_BUSINESSES,
  GET_BUSINESSES_BY_CATEGORY,
  INSERT_BUSINESS,
  GET_BUSINESS_BY_ID,
  UPDATE_BUSINESS_BY_ID,
  GET_SIMILAR_BUSINESSES,
} from "../controllers/business/index.js";
import { userAuth } from "../middleware/user-auth.js";

export const businessRoutes = express.Router();

businessRoutes.get("/businesses", GET_ALL_BUSINESSES);

businessRoutes.get("/businesses/category/:category", GET_BUSINESSES_BY_CATEGORY);

businessRoutes.get("/business/:id", GET_BUSINESS_BY_ID);

businessRoutes.get("/business/:id/similar", GET_SIMILAR_BUSINESSES);

businessRoutes.post("/business", userAuth, INSERT_BUSINESS);

businessRoutes.put("/business/:id", userAuth, UPDATE_BUSINESS_BY_ID);
