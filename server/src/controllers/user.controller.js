import bcrypt from "bcrypt";
// import { formatISO } from "date-fns";
import { UserModel } from "../models/user.model.js";
import { validateEmail } from "../utils/validations/email.validation.js";
import { validatePassword } from "../utils/validations/password.validation.js";
import { toUpperCase } from "../utils/helpers/to-upper-case.js";
import { generateJwt, generateRefreshJwt } from "../middleware/generate-tokens.js";

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

export const LOG_IN = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Unrecognized username or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Unrecognized username or password" });
    }

    const jwt_token = generateJwt(user.id, user.email, user.name);
    const jwt_refresh_token = generateRefreshJwt(user.id, user.email, user.name);

    return res.status(200).json({
      status: `User (${user.email}) have been logged in successfully`,
      jwt_token: jwt_token,
      jwt_refresh_token: jwt_refresh_token,
    });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong during user login",
      details: err.message,
    });
  }
};

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
