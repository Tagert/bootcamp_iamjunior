import jwt from "jsonwebtoken";

const JWT_EXPIRY = "2h";
const REFRESH_JWT_EXPIRY = "24h";

const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const createPayload = (userId, email, name) => ({ userId, email, name });

const generateToken = (secret, expiresIn) => (userId, email, name) => {
  const payload = createPayload(userId, email, name);
  return createToken(payload, secret, expiresIn);
};

export const generateJwt = generateToken(process.env.JWT_SECRET, JWT_EXPIRY);
export const generateRefreshJwt = generateToken(process.env.REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRY);
