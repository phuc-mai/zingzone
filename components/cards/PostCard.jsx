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
import { useEffect, useState } from "react";

const PostCard = ({ id, creator, caption, tag, postPhoto, likes, userId, triggerUpdate }) => {
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const isSaved = userData?.savedPosts?.find((post) => post._id === id);

  const isLiked = userData?.likedPosts?.find((post) => post._id === id);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/savedPosts/${id}`, {
        method: "PATCH",
      });
      const data = await response.json();
      setUserData(data);
      triggerUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/likedPosts/${id}`, {
        method: "PATCH",
      });
      const data = await response.json();
      setUserData(data);
      triggerUpdate();
    } catch (error) {
      console.log(error);
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
        <div className="flex gap-2 items-center">
          {!isLiked ? (
            <FavoriteBorder
              className="text-light-1 cursor-pointer"
              onClick={() => handleLike()}
            />
          ) : (
            <Favorite
              className="text-pink-1 cursor-pointer"
              onClick={() => handleLike()}
            />
          )}
          <p className="text-light-1">{likes.length}</p>
        </div>

        {userId !== creator.clerkId &&
          (isSaved ? (
            <Bookmark
              className="text-purple-1 cursor-pointer"
              onClick={() => handleSave()}
            />
          ) : (
            <BookmarkBorder
              className="text-light-1 cursor-pointer"
              onClick={() => handleSave()}
            />
          ))}
      </div>
    </div>
  );
};

export default PostCard;
