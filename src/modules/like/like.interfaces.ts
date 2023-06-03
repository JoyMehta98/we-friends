import { ObjectId } from "mongoose";

export interface ILike {
  user: ObjectId;
  post: ObjectId;
  comment: ObjectId;
  _id: ObjectId;
}

export interface CommentFilterPayload {
  skip: number;
  limit: number;
  search?: string;
  userId?: string;
}
