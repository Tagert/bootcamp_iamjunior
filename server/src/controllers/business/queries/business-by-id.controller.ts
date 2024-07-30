import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";
import { handleError } from "../../../utils/handleError.js";

export const GET_BUSINESS_BY_ID: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await BusinessModel.findOne({ id });

    if (!business) {
      return res.status(404).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.json(business);
  } catch (err: unknown) {
    handleError(err, res, "getting business by id");
  }
};
