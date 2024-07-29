import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model";
import { validatePassword } from "../../../utils/validations/password.validation";

export const CHANGE_PASSWORD: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const passwordValidation = validatePassword(newPassword);

    if (passwordValidation !== true) {
      return res.status(400).json({ message: passwordValidation });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    const response = await user.save();

    return res.status(201).json({
      user: response,
      message: `Password (${req.body.email}) was changed successfully`,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error during changing password:", errorMessage);

    return res.status(500).json({
      error: "An error occurred during the changing password process.",
      details: errorMessage,
    });
  }
};
