import jwt from "jsonwebtoken";

type DecodedTokenType = {
  userId: string;
  name: string;
  email: string;
};

export const verifyToken = (token: string, secret: string): Promise<DecodedTokenType> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as DecodedTokenType);
    });
  });
};
