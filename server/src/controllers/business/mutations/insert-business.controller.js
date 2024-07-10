import { BusinessModel } from "../../../models/business.model.js";

export const INSERT_BUSINESS = async (req, res) => {
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
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
