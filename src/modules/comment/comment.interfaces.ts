import { ObjectId } from "mongoose";

export interface IComment {
  context: string;
  user: ObjectId;
  post: ObjectId;
  image: string;
  _id: ObjectId;
}

export interface CommentFilterPayload {
  skip: number;
  limit: number;
  search?: string;
  userId?: string;
}
