import { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { BusinessModel } from "../../../models/business.model";
import { handleError } from "../../../utils/handleError";

export const REMOVE_FAVORITE: RequestHandler = async (req, res) => {
  const { user_id, business_id } = req.body;

  try {
    const user = await UserModel.findOne({ id: user_id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const business = await BusinessModel.findOne({ id: business_id });

    if (!business) {
      return res.status(404).send("Business not found");
    }

    if (user.favorites.includes(business_id)) {
      await UserModel.findOneAndUpdate({ id: user_id }, { $pull: { favorites: business_id } }, { new: true });

      business.favorite_count -= 1;
      await business.save();
    }

    res.status(200).send({ message: "The business has been successfully removed from favorites" });
  } catch (err) {
    handleError(err, res, "removing favorite");
  }
};
