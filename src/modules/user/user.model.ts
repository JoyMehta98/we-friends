import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interfaces";
import { Roles } from "constants/enum";

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
    role: {
      type: Number,
      enum: Roles,
      default: Roles.User,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ contactNo: 1 }, { unique: true });

userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
