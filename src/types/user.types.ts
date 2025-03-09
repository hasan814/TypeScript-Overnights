import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  password: string;
  accessToken?: string;
  email?: string;
  mobile?: string;
  avatar?: string
}

