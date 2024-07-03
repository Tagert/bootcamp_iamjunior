import express from "express";
import { GET_ALL_SERVICES } from "../controllers/service.controller.js";

export const serviceRoutes = express.Router();

serviceRoutes.get("/services", GET_ALL_SERVICES);
