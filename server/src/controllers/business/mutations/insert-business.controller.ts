import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";

export const INSERT_BUSINESS: RequestHandler = async (req, res) => {
  try {
    const { user_id, name, description, category, address, contacts, images_url, price } = req.body;

    const business = new BusinessModel({
      user_id,
      name,
      description,
      category,
      address,
      contacts,
      images_url,
      price,
    });

    business.id = business._id.toString();

    const response = await business.save();

    return res.status(201).json({
      response: response,
      message: `This (${name}) business was added successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during adding booking:", err);
      return res.status(500).json({
        error: "An error occurred during the adding process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during the adding process:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the adding process.",
        details: String(err),
      });
    }
  }
};
