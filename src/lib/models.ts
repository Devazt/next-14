import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: "string",
    },
    img: {
      type: "string",
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
    },
    userId: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
