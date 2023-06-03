import mongoose from "mongoose";
import { IRequests } from "./requests.interfaces";
import { RequestStatus } from "constants/enum";

const requestsSchema = new mongoose.Schema<IRequests>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    requester: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: Number,
      enum: RequestStatus,
      default: RequestStatus.SENT,
    },
  },
  {
    timestamps: true,
  }
);

requestsSchema.index({ user: 1, requester: 1 }, { unique: true });

const Requests = mongoose.model<IRequests>("Requests", requestsSchema);

export default Requests;
