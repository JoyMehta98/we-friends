import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "modules/user/user.interfaces";
import User from "modules/user/user.model";
import { appConfig } from "config/app.config";

const authenticateUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email }).select(["email", "password"]);

  if (!user) {
    throw new Error();
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error();
  }

  return user;
};

export const generateToken = (user: IUser): string =>
  jwt.sign({ id: user._id }, appConfig.jwtSecret, { expiresIn: "1d" });

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await authenticateUser(email, password);
  const token = generateToken(user);

  return { user, token };
};
