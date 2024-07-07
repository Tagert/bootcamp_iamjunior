import { categoryRoutes } from "../routes/category.routes.js";

export const GET_ALL_CATEGORIES = async (req, res) => {
    try {
      const categories = await categoryRoutes.find();
  
      if (!categories.length) {
        return res.status(404).json({ message: "Data not exist" });
      }
  
      return res.status(200).json({ categories });
    } catch (err) {
      console.error("HANDLED ERROR:", err);
      return res.status(500).json({
        error: "Something went wrong",
        details: err.message,
      });
    }
  };


  export const INSERT_CATEGORY = async (req, res) => {
    try {
      const { name, color, icon_url } = req.body;
  
      const category = new BusinessModel({
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