import mongoose from "mongoose";
import { IFollowers } from "./followers.interfaces";

const followersSchema = new mongoose.Schema<IFollowers>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    follower: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

followersSchema.index({ user: 1, follower: 1 }, { unique: true });

const Followers = mongoose.model<IFollowers>("Followers", followersSchema);

export default Followers;
