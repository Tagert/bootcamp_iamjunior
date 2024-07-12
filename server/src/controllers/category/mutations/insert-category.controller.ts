import { CategoryModel } from "../../../models/category.model.js";

export const INSERT_CATEGORY = async (req, res) => {
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
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
