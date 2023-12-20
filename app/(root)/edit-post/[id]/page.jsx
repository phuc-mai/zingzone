import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUser } from "@app/api/user";
import { getPost, updatePost } from "@app/api/post";
import Posting from "@components/forms/Posting";


const EditPost = async ({ params }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userData = await getUser(user.id);
  if (!userData) redirect("/create-profile");

  const post = await getPost(params.id);

  const postData = {
    postId: params.id,
    caption: post?.caption,
    tag: post?.tag,
    postPhoto: post?.postPhoto,
  };

  return (
    <div className="pt-6">
      <Posting
        post={postData}
        handlePublish={updatePost}
      />
    </div>
  );
};

export default EditPost;
