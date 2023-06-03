import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ contactNo: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
