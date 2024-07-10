import { BusinessModel } from "../../../models/business.model.js";

export const UPDATE_BUSINESS_BY_ID = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_id, ...updateFields } = req.body;

    const business = await BusinessModel.findOne({ id });

    if (!business) {
      return res.status(404).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    if (business.user_id !== user_id) {
      return res.status(401).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const updatedBusiness = await BusinessModel.findOneAndUpdate({ id }, { $set: updateFields }, { new: true });

    return res.status(200).json({
      message: `Business with ID (${id}) was successfully updated`,
      updatedBusiness,
    });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
