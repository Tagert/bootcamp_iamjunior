import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { handleError } from "../../../utils/handleError";

export const GET_USER_BY_ID: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(400).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.status(200).json(user);
  } catch (err: unknown) {
    handleError(err, res, "getting user by id");
  }
};
