import { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { handleError } from "../../../utils/handleError";

export const UPDATE_USER_BY_ID: RequestHandler = async (req, res) => {
  try {
    const { id, ...updateFields } = req.body;

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(404).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate({ id }, { $set: updateFields }, { new: true });

    return res.status(200).json({
      message: `User with ID (${id}) was successfully updated`,
      updatedUser,
    });
  } catch (err: unknown) {
    handleError(err, res, "updating user");
  }
};
