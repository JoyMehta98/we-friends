import { errorMessages } from "constants/messages";
import { generateToken } from "modules/auth/auth.service";
import User from "./user.model";
import { CreateUserDto } from "./user.dto";
import { IUser, UserFilterPayload } from "./user.interfaces";

export const createUser = async (
  payload: CreateUserDto
): Promise<{ user: Omit<IUser, "password">; token: string }> => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error(errorMessages.userAlreadyExists);
  }

  const data = await User.create(payload);
  const token = generateToken(data);

  const userData = data.toJSON();
  const { password, ...rest } = userData;

  return { user: rest, token };
};

export const getFilteredUsers = async (
  options: UserFilterPayload
): Promise<IUser[]> => {
  const { limit, skip, search = "" } = options;
  const users = await User.find({ name: new RegExp(search, "i") })
    .skip(skip)
    .limit(limit)
    .select({ password: 0 });

  return users;
};

export const getUserById = async (id: string): Promise<IUser | null> =>
  User.findById(id).select({ password: 0 });

export const getUserByEmail = async (email: string): Promise<IUser | null> =>
  User.findOne({ email }).select({ password: 0 });

export const updateUserById = async (
  userId: string,
  updateBody: Partial<CreateUserDto>
): Promise<IUser | null> =>
  User.findByIdAndUpdate(userId, { $set: updateBody }, { new: true }).select({
    password: 0,
  });

export const deleteUserById = async (userId: string): Promise<void> => {
  await User.deleteOne({ _id: userId });
};
