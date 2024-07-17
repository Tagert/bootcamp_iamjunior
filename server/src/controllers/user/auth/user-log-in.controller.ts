import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user.model.js";
import { generateJwt, generateRefreshJwt } from "../../../middleware/generate-tokens.js";

export const LOG_IN: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Unrecognized username or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Unrecognized username or password" });
    }

    const jwt_token = generateJwt(user.id, user.email, user.name);
    const jwt_refresh_token = generateRefreshJwt(user.id, user.email, user.name);

    const userWithoutPassword = await UserModel.findById(user._id).select("-password");

    return res.status(200).json({
      status: `User (${user.email}) have been logged in successfully`,
      token: jwt_token,
      user: userWithoutPassword,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during logging:", err);
      return res.status(500).json({
        error: "An error occurred during the logging.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during logging:", err);
      return res.status(500).json({
        error: "An unknown error occurred during logging.",
        details: String(err),
      });
    }
  }
};
