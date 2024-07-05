import { BusinessModel } from "../models/business.model.js";

export const GET_ALL_BUSINESSES = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();

    if (!businesses.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ businesses });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};

export const GET_BUSINESSES_BY_CATEGORY = async (req, res) => {
  try {
    const { category } = req.params;

    const businesses = await BusinessModel.find({ category });

    if (!businesses) {
      return res.status(400).json({
        message: `The entered category (${category}) does not exist. Please try entering a different category.`,
      });
    }

    return res.json(businesses);
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};

export const INSERT_BUSINESS = async (req, res) => {
  try {
    const { name, description, category, address, contacts, images_url, price } = req.body;

    const business = new BusinessModel({
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
