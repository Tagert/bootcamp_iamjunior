import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { handleError } from "../../../utils/handleError";

export const GET_ALL_USERS: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ users });
  } catch (err: unknown) {
    handleError(err, res, "getting all users");
  }
};
