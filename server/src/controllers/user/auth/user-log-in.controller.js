import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user.model.js";
import { generateJwt, generateRefreshJwt } from "../../../middleware/generate-tokens.js";

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
