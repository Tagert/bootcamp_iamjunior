import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";
import { handleError } from "../../../utils/handleError.js";

export const INSERT_BUSINESS: RequestHandler = async (req, res) => {
  try {
    const { user_id, name, description, category, provider, address, contacts, images_url, price, working_hours } =
      req.body;

    const business = new BusinessModel({
      user_id,
      name,
      description,
      category,
      provider,
      address,
      contacts,
      images_url,
      price,
      working_hours,
    });

    business.id = business._id.toString();

    const response = await business.save();

    return res.status(201).json({
      response,
      message: `This (${name}) business was added successfully`,
    });
  } catch (err: unknown) {
    handleError(err, res, "adding business");
  }
};
