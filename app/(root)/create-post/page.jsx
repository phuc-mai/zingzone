import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUser } from "@app/api/user";
import { createPost } from "@app/api/post";
import Posting from "@components/forms/Posting";

const CreatePost = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await getUser(user.id);
  if (!userData) redirect("/create-profile");

  const postData = {
    creator: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return (
    <div className="pt-6">
      <Posting post={postData} handlePublish={createPost} />
    </div>
  );
};

export default CreatePost;
