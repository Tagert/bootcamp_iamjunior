import express from "express";
import { GET_ALL_USERS, SIGN_UP, LOG_IN, GET_USER_BY_ID, DELETE_USER_BY_ID } from "../controllers/user/index.js";
import { userAuth } from "../middleware/user-auth.js";

export const userRoutes = express.Router();

userRoutes.post("/register", SIGN_UP);

userRoutes.post("/login", LOG_IN);

userRoutes.get("/users", userAuth, GET_ALL_USERS);

userRoutes.get("/user/:id", GET_USER_BY_ID);

userRoutes.delete("/user/:id", userAuth, DELETE_USER_BY_ID);
