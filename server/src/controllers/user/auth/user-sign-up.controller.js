import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user.model.js";
import { validateEmail } from "../../../utils/validations/email.validation.js";
import { validatePassword } from "../../../utils/validations/password.validation.js";
import { toUpperCase } from "../../../utils/helpers/to-upper-case.js";

export const SIGN_UP = async (req, res) => {
  try {
    // const dateTime = formatISO(new Date());

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const emailValidation = validateEmail(req.body.email);
    const passwordValidation = validatePassword(req.body.password);

    if (!emailValidation) {
      return res.status(400).json({ message: "Please provide a properly formatted email address" });
    }

    if (passwordValidation !== true) {
      return res.status(400).json({ message: passwordValidation });
    }

    const isUserExist = await UserModel.findOne({ email: req.body.email });

    if (isUserExist) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const user = new UserModel({
      name: toUpperCase(req.body.name),
      email: req.body.email,
      password: hash,
    });

    user.id = user._id.toString();

    const response = await user.save();

    return res.status(201).json({
      user: response,
      message: `User (${req.body.email}) was added successfully`,
    });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong during user registration",
      details: err.message,
    });
  }
};
