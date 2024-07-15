import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";

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
    if (err instanceof Error) {
      console.error("Error during getting business by id:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during the getting process:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
