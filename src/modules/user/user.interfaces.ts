import { ObjectId } from "mongoose";

export interface IUser {
  name: string;
  contactNo: number;
  email: string;
  password: string;
  coverImage: string;
  profileImage: string;
  _id: ObjectId;
}

export interface UserFilterPayload {
  skip: number;
  limit: number;
  search?: string;
}
