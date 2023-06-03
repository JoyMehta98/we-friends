import { ObjectId } from "mongoose";

export interface IFollowers {
  user: ObjectId;
  follower: ObjectId;
  _id: ObjectId;
}

export interface FollowerFilterPayload {
  skip: number;
  limit: number;
  userId: string;
}
