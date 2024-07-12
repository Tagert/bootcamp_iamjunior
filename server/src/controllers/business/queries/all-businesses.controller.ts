import { BusinessModel } from "../../../models/business.model.js";

export const GET_ALL_BUSINESSES = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();

    if (!businesses.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ businesses });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
