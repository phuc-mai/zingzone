import Image from "next/image";
import Link from "next/link";
import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
  BorderColor,
} from "@mui/icons-material";
import { currentUser } from "@clerk/nextjs";
import { likePost, savePost } from "@app/api/post";
import { getUser } from "@app/api/user";

const PostCard = async ({ id, creator, caption, tag, postPhoto }) => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await getUser(user.id);

  const isSaved = userData?.savedPosts.find((item) => item?._id === id);

  // handle save post function
  const handleSave = async () => {
    try {
      await savePost(id, userData._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
      <div className="flex justify-between">
        <Link href={`profile/${creator.clerkId}/posts`}>
          <div className="flex gap-3 items-center">
            <Image
              src={creator.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small-semibold text-light-1">
                {creator.firstName} {creator.lastName}
              </p>
              <p className="text-subtle-medium text-light-3">
                @{creator.username}
              </p>
            </div>
          </div>
        </Link>

        {user.id === creator.clerkId && (
          <Link href={`/edit-post/${id}`}>
            <BorderColor className="text-light-1 cursor-pointer" />
          </Link>
        )}
      </div>

      <p className="text-body-normal text-light-1 max-sm:text-small-normal">
        {caption}
      </p>

      <Image
        src={postPhoto}
        alt="post photo"
        width={200}
        height={150}
        className="w-full rounded-lg"
      />

      <p className="text-base-semibold text-purple-1 max-sm:text-small-normal">
        {tag}
      </p>

      <div className="flex justify-between">
        <FavoriteBorder className="text-light-1 cursor-pointer" />

        {user.id !== creator.clerkId && !isSaved && (
          <BookmarkBorder className="text-light-1 cursor-pointer" />
        )}

        {user.id !== creator.clerkId && isSaved && (
          <Bookmark className="text-purple-1 cursor-pointer" onClick={handleSave}/>
        )}
      </div>
    </div>
  );
};

export default PostCard;
