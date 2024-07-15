import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";

export const GET_BUSINESSES_BY_CATEGORY: RequestHandler = async (req, res) => {
  try {
    const { category } = req.params;

    const businesses = await BusinessModel.find({ category });

    if (!businesses.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    if (!businesses) {
      return res.status(400).json({
        message: `The entered category (${category}) does not exist. Please try entering a different category.`,
      });
    }

    return res.json(businesses);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting business by category:", err);
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
