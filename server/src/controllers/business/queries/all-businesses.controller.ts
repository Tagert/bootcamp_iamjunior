import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";

export const GET_ALL_BUSINESSES: RequestHandler = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();

    if (!businesses.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ businesses });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting all businesses:", err);
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
