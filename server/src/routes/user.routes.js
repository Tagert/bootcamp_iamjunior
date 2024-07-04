import express from "express";
import { GET_ALL_USERS, SIGN_UP } from "../controllers/user.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/register", SIGN_UP);

userRoutes.post("/login");

userRoutes.get("/users", GET_ALL_USERS);

userRoutes.get("/user/:id");

userRoutes.delete("/user/:id");
