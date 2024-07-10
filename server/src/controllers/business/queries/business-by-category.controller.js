import { BusinessModel } from "../../../models/business.model.js";

export const GET_BUSINESSES_BY_CATEGORY = async (req, res) => {
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
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
