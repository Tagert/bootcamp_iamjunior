import { UserModel } from "../../../models/user.model.js";

export const DELETE_USER_BY_ID = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(400).json({
        message: `User with this ID (${id}) does not exist`,
      });
    }

    if (user.id !== user_id) {
      return res.status(401).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const deletionResult = await UserModel.deleteOne({ id });

    return res.status(200).json({
      message: `User with ID (${id}) was deleted`,
      response: deletionResult,
    });
  } catch (err) {
    console.error("Error during user deletion:", err);
    return res.status(500).json({
      error: "An error occurred during the deletion process.",
      details: err.message,
    });
  }
};
