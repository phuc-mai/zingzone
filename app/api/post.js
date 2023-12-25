"use server";

import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { writeFile } from "fs/promises";

const path = require("path");
const currentWorkingDirectory = process.cwd();

export const createPost = async (data) => {
  try {
    await connectToDB();

    let postPhoto = data.get("postPhoto");

    // Taking the file which is a Web specific API and turn it into some form of bytes that NodeJS or other server APIs understand
    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, we can do whatever we want with it
    // For example, we can write it to the file system in a new location
    const postPhotoPath = path.join(
      currentWorkingDirectory,
      "public",
      "uploads",
      postPhoto.name
    );
    await writeFile(postPhotoPath, buffer);

    postPhoto = `/uploads/${postPhoto.name}`;

    const newPost = await Post.create({
      creator: data.get("creator"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });

    // Update the user's posts array
    await User.findByIdAndUpdate(data.get("creator"), {
      $push: { posts: newPost._id },
    });

    return newPost;
  } catch (err) {
    throw new Error(`Failed to create a new post: ${err.message}`);
  }
};

export const getPost = async (postId) => {
  try {
    await connectToDB();

    const post = await Post.findById(postId).populate("creator likes").exec();

    return post;
  } catch (err) {
    throw new Error(`Failed to get post by id: ${err.message}`);
  }
};

export const updatePost = async (data) => {
  const postId = data.get("postId");

  try {
    await connectToDB();

    let postPhoto = data.get("postPhoto");

    // Check if data.get("profilePhoto") is an array or a string
    if (typeof postPhoto !== "String") {
      // Taking the file which is a Web specific API and turn it into some form of bytes that NodeJS or other server APIs understand
      const bytes = await postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // With the file data in the buffer, we can do whatever we want with it
      // For example, we can write it to the file system in a new location
      const postPhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        postPhoto.name
      );
      await writeFile(postPhotoPath, buffer);

      postPhoto = `/uploads/${postPhoto.name}`;
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          caption: data.get("caption"),
          tag: data.get("tag"),
          postPhoto: postPhoto,
        },
      },
      { upsert: true, new: true } // Create a new user if the user does not exist, and return the updated document
    );

    return post;
  } catch (err) {
    throw new Error(`Failed to update post: ${err.message}`);
  }
};

export const deletePost = async (postId) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(postId);
  } catch (err) {
    throw new Error(`Failed to delete post: ${err.message}`);
  }
};

export const getFeedPosts = async () => {
  try {
    await connectToDB();

    const feedPosts = await Post.find().populate("creator likes").exec();

    return feedPosts;
  } catch (err) {
    throw new Error(`Failed to get feed posts: ${err.message}`);
  }
};

export const getUserPosts = async (userId) => {
  try {
    await connectToDB();

    const userPosts = await Post.find({ creator: userId })
      .populate("creator likes")
      .exec();

    return userPosts;
  } catch (err) {
    throw new Error(`Failed to get user's posts: ${err.message}`);
  }
};

export const getPostsBySearch = async (search) => {
  try {
    await connectToDB();

    const searchedPosts = await Post.find({
      $or: [
        { caption: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
      ],
    })
      .populate("creator likes")
      .exec();

    return searchedPosts;
  } catch (err) {
    throw new Error(`Failed to get searched posts: ${err.message}`);
  }
};

export const savePost = async (postId, userId) => {
  try {
    await connectToDB();

    const user = await User.findById(userId).populate("savedPosts").exec();
    const post = await Post.findById(postId).populate("creator likes").exec();

    const savedPost = user.savedPosts.find(
      (item) => item._id.toString() === postId
    );

    if (savedPost) {
      user.savedPosts = user.savedPosts.filter(
        (item) => item._id.toString() !== postId
      );
      await user.save();
      return false;
    } else {
      user.savedPosts.push(post);
      await user.save();
      return true;
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to save or unsave post: ${err.message}`);
  }
};

export const likePost = async ({ postId, userId }) => {
  try {
    await connectToDB();

    // Update the post's likes array
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: userId },
      },
      { upsert: true, new: true }
    )
      .populate("likes")
      .exec();

    // Update the user's likedPosts array
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { likedPosts: postId },
      },
      { upsert: true, new: true }
    )
      .populate("likedPosts")
      .exec();

    return { post, user };
  } catch (err) {
    throw new Error(`Failed to like post: ${err.message}`);
  }
};
