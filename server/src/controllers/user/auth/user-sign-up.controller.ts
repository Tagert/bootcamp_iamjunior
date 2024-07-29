import type { RequestHandler } from "express";
import { UserModel } from "../../../models/user.model.js";
import { validateEmail } from "../../../utils/validations/email.validation.js";
import { validatePassword } from "../../../utils/validations/password.validation.js";
import { toUpperCase } from "../../../utils/helpers/to-upper-case.js";
import { hashPassword } from "../../../utils/hashPassword.js";
import { handleError } from "../../../utils/handleError.js";

export const SIGN_UP: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await hashPassword(password);

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation) {
      return res.status(400).json({ message: "Please provide a properly formatted email address" });
    }

    if (passwordValidation !== true) {
      return res.status(400).json({ message: passwordValidation });
    }

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const user = new UserModel({
      name: toUpperCase(name),
      email,
      password: hash,
    });

    user.id = user._id.toString();

    const response = await user.save();

    return res.status(201).json({
      user: response,
      message: `User (${email}) was added successfully`,
    });
  } catch (err: unknown) {
    handleError(err, res, "booking deletion");
  }
};
