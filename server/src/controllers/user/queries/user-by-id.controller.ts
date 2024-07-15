import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model.js";

export const GET_USER_BY_ID: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(400).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting user by id:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during the getting process:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
