import { Post } from "@/lib/models";
import connectDB from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const { slug } = params;

  try {
    connectDB();

    const post = await Post.findOne({ slug });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to get post!");
  }
};

export const DELETE = async (request: any, { params }: any) => {
  const { slug } = params;

  try {
    connectDB();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted successfully");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to delete post!");
  }
};
