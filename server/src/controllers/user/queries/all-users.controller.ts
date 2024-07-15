import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model.js";

export const GET_ALL_USERS: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ users });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting all users:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during getting all users:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
