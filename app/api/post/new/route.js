import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();

  try {
    await connectToDB();

    const data = await req.formData();
    console.log(data)

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
      creator: data.get("creatorId"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });


    await newPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(data.get("creatorId"), {
      $push: { posts: newPost._id },
    });

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new Post", { status: 500 });
  }
};
