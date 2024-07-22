import { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model";

export const GET_SIMILAR_BUSINESSES: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide business ID." });
  }

  try {
    const business = await BusinessModel.findOne({ id });
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const similarBusinesses = await BusinessModel.find({
      category: business.category,
      _id: { $ne: business._id },
    }).limit(3);

    res.status(200).json(similarBusinesses);
  } catch (err) {
    console.error("Error fetching similar businesses:", err);
    res.status(500).json({
      error: "An error occurred while fetching similar businesses.",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};
