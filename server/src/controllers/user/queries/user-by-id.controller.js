import { UserModel } from "../../../models/user.model.js";

export const GET_USER_BY_ID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(400).json({
        message: `The entered ID (${id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "An unexpected error occurred",
      details: err.message,
    });
  }
};
