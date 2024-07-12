import { BusinessModel } from "../../../models/business.model.js";

export const GET_BUSINESS_BY_ID = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await BusinessModel.findOne({ id });

    if (!business) {
      return res.status(404).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.json(business);
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
