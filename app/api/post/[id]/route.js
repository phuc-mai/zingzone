import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate("creator likes")
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get post by id", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();

  try {
    await connectToDB();

    const data = await req.formData();

    let postPhoto = data.get("postPhoto");

    // Check if data.get("profilePhoto") is an array or a string
    if (typeof postPhoto !== "string") {
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
      params.id,
      {
        $set: {
          caption: data.get("caption"),
          tag: data.get("tag"),
          postPhoto: postPhoto,
        },
      },
      { upsert: true, new: true } // Create a new user if the user does not exist, and return the updated document
    );

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error updating the Work", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);

    return new Response("Successfully deleted the Post", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error deleting the Post", { status: 500 });
  }
};
