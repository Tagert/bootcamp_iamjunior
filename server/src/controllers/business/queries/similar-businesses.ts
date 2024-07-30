import { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model";
import { handleError } from "../../../utils/handleError";

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
    handleError(err, res, "getting similar businesses");
  }
};
