import mongoose from "mongoose";
import { ILike } from "./like.interfaces";

const likeSchema = new mongoose.Schema<ILike>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    comment: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model<ILike>("Like", likeSchema);

export default Like;
