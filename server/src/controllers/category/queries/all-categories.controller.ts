import { CategoryModel } from "../../../models/category.model.js";

export const GET_ALL_CATEGORIES = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json(categories);
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
