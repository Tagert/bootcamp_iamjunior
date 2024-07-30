import type { RequestHandler } from "express";
import { BusinessModel } from "../../../models/business.model.js";
import { handleError } from "../../../utils/handleError.js";

export const GET_ALL_BUSINESSES: RequestHandler = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();

    if (!businesses.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json(businesses);
  } catch (err: unknown) {
    handleError(err, res, "getting all businesses");
  }
};
