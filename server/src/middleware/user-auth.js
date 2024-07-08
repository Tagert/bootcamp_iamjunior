import { verifyToken } from "./verify-token.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "User has not been authenticated" });
    }

    const decoded = await verifyToken(authorization, process.env.JWT_SECRET);

    req.body.user_id = decoded.userId;
    req.body.user_name = decoded.name;
    req.body.user_email = decoded.email;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
