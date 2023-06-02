import { sign, verify } from "jsonwebtoken";
import { errorMessages } from "constants/messages";
import { appConfig } from "config/app.config";

export const jwtSign = (payload: object) =>
  sign(payload, appConfig.jwtSecret, { expiresIn: "1d" });

export const verifyToken = (token: string): any =>
  verify(token, appConfig.jwtSecret);

export const decodeToken = (authorization: string) => {
  if (!authorization.includes("Bearer")) {
    throw new Error(errorMessages.unauthorized);
  }
  const authToken = authorization.split(" ");

  const { id } = verifyToken(authToken[1]);

  return { id };
};
