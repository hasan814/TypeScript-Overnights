import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";



const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  email: { type: String, unique: true, sparse: true, trim: true },
  mobile: { type: String, unique: true, sparse: true, trim: true },
  avatar: { type: String }
}, { timestamps: true });

export const UserModel = model<IUser>("User", UserSchema);
