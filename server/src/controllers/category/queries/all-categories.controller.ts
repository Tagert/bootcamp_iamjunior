import type { RequestHandler } from "express";
import { CategoryModel } from "../../../models/category.model.js";

export const GET_ALL_CATEGORIES: RequestHandler = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json(categories);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting all categories:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during booking deletion:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
