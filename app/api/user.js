"use server";

import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { writeFile } from "fs/promises";

const path = require("path");
const currentWorkingDirectory = process.cwd();

export const getUser = async (userId) => {
  try {
    await connectToDB();

    const user = await User.findOne({ clerkId: userId })
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return user;
  } catch (err) {
    throw new Error(`Failed to get user by ClearkId: ${err.message}`);
  }
};

export const updateUserInfo = async (data) => {
  try {
    await connectToDB();

    let profilePhoto = data.get("profilePhoto");

    // Check if data.get("profilePhoto") is an array or a string
    if (typeof profilePhoto !== "string") {
      // Taking the file which is a Web specific API and turn it into some form of bytes that NodeJS or other server APIs understand
      const bytes = await profilePhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // With the file data in the buffer, we can do whatever we want with it
      // For example, we can write it to the file system in a new location
      const profilePhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        profilePhoto.name
      );
      await writeFile(profilePhotoPath, buffer);

      profilePhoto = `/uploads/${profilePhoto.name}`;
    }

    const user = await User.findOneAndUpdate(
      { clerkId: data.get("clerkId") },
      {
        $set: {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          username: data.get("username"),
          bio: data.get("bio"),
          profilePhoto: profilePhoto,
          joined: true,
        },
      },
      { upsert: true, new: true } // Create a new user if the user does not exist, and return the updated document
    );

    return JSON.stringify(user);
  } catch (err) {
    throw new Error(`Failed to create or update user: ${err.message}`);
  }
};

export const getAllUsers = async () => {
  try {
    await connectToDB();

    const allUsers = await User.find()
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return allUsers;
  } catch (err) {
    throw new Error(`Failed to get all users: ${err.message}`);
  }
};

export const getUsersBySearch = async (search) => {
  try {
    await connectToDB();

    const searchedUsers = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
    })
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return searchedUsers;
  } catch (err) {
    throw new Error(`Failed to get searched users: ${err.message}`);
  }
}
