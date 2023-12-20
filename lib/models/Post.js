import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },
  postPhoto: {
    type: String,
    required: [true, "Post photo is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
