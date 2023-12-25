"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
  BorderColor,
} from "@mui/icons-material";
import { likePost, savePost } from "@app/api/post";
import { getUser } from "@app/api/user";
import { useEffect, useState } from "react";

const PostCard = ({ id, creator, caption, tag, postPhoto, userId, userData }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsSaved(userData?.savedPosts?.find((item) => item?._id === id));
    }
  }, [userData]);

  // handle save post function
  const handleSave = async () => {
    try {
      const isAlreadySaved = await savePost(id, userData._id);
      setIsSaved(isAlreadySaved);
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

        {userId === creator.clerkId && (
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

        {userId !== creator.clerkId && !isSaved && (
          <BookmarkBorder
            className="text-light-1 cursor-pointer"
            onClick={() => handleSave()}
          />
        )}

        {userId !== creator.clerkId && isSaved && (
          <Bookmark
            className="text-purple-1 cursor-pointer"
            onClick={() => handleSave()}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
