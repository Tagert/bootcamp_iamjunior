import type { RequestHandler } from "express";
import { CategoryModel } from "../../../models/category.model.js";
import { handleError } from "../../../utils/handleError.js";

export const GET_ALL_CATEGORIES: RequestHandler = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json(categories);
  } catch (err: unknown) {
    handleError(err, res, "getting all categories");
  }
};
