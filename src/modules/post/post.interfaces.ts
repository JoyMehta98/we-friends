import { ObjectId } from "mongoose";

export interface IPost {
  context: string;
  user: ObjectId;
  image: string;
  _id: ObjectId;
}

export interface PostFilterPayload {
  skip: number;
  limit: number;
  search?: string;
  userId?: string;
}
