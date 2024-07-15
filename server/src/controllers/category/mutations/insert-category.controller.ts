import type { RequestHandler } from "express";
import { CategoryModel } from "../../../models/category.model.js";

export const INSERT_CATEGORY: RequestHandler = async (req, res) => {
  try {
    const { name, color, icon_url } = req.body;

    const category = new CategoryModel({
      name,
      color,
      icon_url,
    });

    category.id = category._id.toString();

    const response = await category.save();

    return res.status(201).json({
      response: response,
      message: `This (${name}) category was added successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during adding category:", err);
      return res.status(500).json({
        error: "An error occurred during the adding process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during the adding process:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the adding process.",
        details: String(err),
      });
    }
  }
};
