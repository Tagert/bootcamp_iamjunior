import type { RequestHandler } from "express";
import { CategoryModel } from "../../../models/category.model.js";
import { handleError } from "../../../utils/handleError.js";

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
    handleError(err, res, "adding category");
  }
};
