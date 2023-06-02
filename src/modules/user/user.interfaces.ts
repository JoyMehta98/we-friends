import { ObjectId } from "mongoose";
import { Roles } from "constants/enum";

export interface IUser {
  name: string;
  contactNo: number;
  email: string;
  password: string;
  coverImage: string;
  profileImage: string;
  role: Roles;
  _id: ObjectId;
}

export interface UserFilterPayload {
  skip: number;
  limit: number;
  search?: string;
}
