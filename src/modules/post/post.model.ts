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
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ email: 1 }, { unique: true });
postSchema.index({ contactNo: 1 }, { unique: true });

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
