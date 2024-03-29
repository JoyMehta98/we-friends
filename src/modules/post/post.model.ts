import mongoose from "mongoose";
import { IPost } from "./post.interfaces";

const postSchema = new mongoose.Schema<IPost>(
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
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
