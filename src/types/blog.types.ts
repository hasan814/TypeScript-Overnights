import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  text: string;
  image: string;
  author: string;
}