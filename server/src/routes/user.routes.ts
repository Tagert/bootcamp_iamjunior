import express from "express";
import { GET_ALL_USERS, SIGN_UP, LOG_IN, GET_USER_BY_ID, DELETE_USER_BY_ID } from "../controllers/user/index";
import { userAuth } from "../middleware/user-auth";
import { validateTokenExpiration } from "../middleware/validate-token-expiration";

export const userRoutes = express.Router();

userRoutes.get("/protected", validateTokenExpiration, (req, res) => {
  res.send("This route is protected and the token is valid and not expired.");
});

userRoutes.post("/register", SIGN_UP);

userRoutes.post("/login", LOG_IN);

userRoutes.get("/users", GET_ALL_USERS);

userRoutes.get("/user/:id", GET_USER_BY_ID);

userRoutes.delete("/user/:id", userAuth, DELETE_USER_BY_ID);
