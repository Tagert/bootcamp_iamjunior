import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/load-env.config";

export const validateTokenExpiration: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User has not been authenticated" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token has expired" });
    }

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
