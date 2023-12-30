import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);
    const user = await User.findOneAndUpdate({ clerkId: params.userId }, { $pull: { posts: params.id } }, { new: true }).populate("posts savedPosts likedPosts followers following");

    return new Response("Successfully deleted the Post", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error deleting the Post", { status: 500 });
  }
};