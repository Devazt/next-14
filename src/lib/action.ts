"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import connectDB from "./utils";
import bcrypt from "bcrypt";

export const addPost = async (prevState: any, formData: any) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectDB();

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData: any) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const addUser = async (previousState: any, formData: any) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectDB();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    revalidatePath("/admin");
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};

export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDB();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState: any, formData: any) => {
  const { username, email, password, passwordConfirm, img } =
    Object.fromEntries(formData);

  if (password !== passwordConfirm) {
    return { error: "Password does not match" };
  }

  try {
    connectDB();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "User already registered" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("User saved");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (previousState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error: any) {
    console.log(error);

    if (error.message.includes("credentials")) {
      return { error: "Wrong username or password" };
    }
    throw error;
  }
};
