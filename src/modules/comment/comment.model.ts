import mongoose from "mongoose";
import { IComment } from "./comment.interfaces";

const commentSchema = new mongoose.Schema<IComment>(
  {
    context: {
      type: String,
      required: true,
      trim: true,
    },
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
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
