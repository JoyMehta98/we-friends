import { RequestStatus } from "constants/enum";
import { ObjectId } from "mongoose";

export interface IRequests {
  user: ObjectId;
  requester: ObjectId;
  status: RequestStatus;
  _id: ObjectId;
}

export interface RequestFilterPayload {
  skip: number;
  limit: number;
  userId: string;
}
