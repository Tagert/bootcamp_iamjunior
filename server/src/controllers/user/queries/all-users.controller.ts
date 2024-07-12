import { UserModel } from "../../../models/user.model.js";

export const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "An unexpected error occurred",
      details: err.message,
    });
  }
};
