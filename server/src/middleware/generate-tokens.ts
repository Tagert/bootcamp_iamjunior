import jwt from "jsonwebtoken";
import { config } from "../config/load-env.config";

type TokenPayloadType = {
  userId: string;
  email: string;
  name: string;
};

const createToken = (payload: TokenPayloadType, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const createPayload = (userId: string, email: string, name: string) => ({ userId, email, name });

const generateToken = (secret: string, expiresIn: string) => (userId: string, email: string, name: string) => {
  const payload = createPayload(userId, email, name);
  return createToken(payload, secret, expiresIn);
};

export const generateJwt = generateToken(config.jwt.secret, config.jwt.expiration);
export const generateRefreshJwt = generateToken(config.jwt_refresh.secret, config.jwt_refresh.expiration);
