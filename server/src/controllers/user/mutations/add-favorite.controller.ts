import { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { BusinessModel } from "../../../models/business.model";
import { handleError } from "../../../utils/handleError";

export const ADD_FAVORITE: RequestHandler = async (req, res) => {
  const { user_id, business_id } = req.body;

  try {
    const user = await UserModel.findOne({ id: user_id });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const business = await BusinessModel.findOne({ id: business_id });

    if (!business) {
      return res.status(404).json("Business not found");
    }

    if (!user.favorites.includes(business_id)) {
      await UserModel.findOneAndUpdate(
        {
          id: user_id,
        },
        {
          $push: { favorites: business_id },
        },
        { new: true },
      );

      business.favorite_count += 1;
      await business.save();
    }

    res.status(200).json({ message: "The business has been successfully added to favorites" });
  } catch (err) {
    handleError(err, res, "adding favorite");
  }
};
