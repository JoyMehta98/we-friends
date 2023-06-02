import { decodeToken } from "utils/jwt.util";
import { errorMessages } from "constants/messages";
import { Request } from "express";
import User from "modules/user/user.model";
import { Roles } from "constants/enum";

export const adminMiddleware = async (req: Request) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization?.includes("Bearer")) {
      throw new Error(errorMessages.unauthorized);
    }
    const authToken = authorization.split(" ");

    const { id } = decodeToken(authToken[1]);

    const user = await User.findById(id);

    if (!user || user.role !== Roles.Admin) {
      throw new Error(errorMessages.unauthorized);
    }

    return true;
  } catch (err) {
    throw new Error(errorMessages.unauthorized);
  }
};
