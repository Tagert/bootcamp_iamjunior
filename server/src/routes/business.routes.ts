import express from "express";
import {
  GET_ALL_BUSINESSES,
  GET_BUSINESSES_BY_CATEGORY,
  INSERT_BUSINESS,
  GET_BUSINESS_BY_ID,
  UPDATE_BUSINESS_BY_ID,
  GET_SIMILAR_BUSINESSES,
  LEAVE_REVIEW,
} from "../controllers/business/index";
import { userAuth } from "../middleware/user-auth";

export const businessRoutes = express.Router();

businessRoutes.get("/businesses", GET_ALL_BUSINESSES);

businessRoutes.get("/businesses/category/:category", GET_BUSINESSES_BY_CATEGORY);

businessRoutes.get("/business/:id", GET_BUSINESS_BY_ID);

businessRoutes.get("/business/:id/similar", GET_SIMILAR_BUSINESSES);

businessRoutes.post("/business", userAuth, INSERT_BUSINESS);

businessRoutes.post("/business/:id/review", userAuth, LEAVE_REVIEW);

businessRoutes.put("/business/:id", userAuth, UPDATE_BUSINESS_BY_ID);
