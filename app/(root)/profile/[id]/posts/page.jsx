import { getUserPosts } from "@app/api/post";
import { getUser } from "@app/api/user";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import React from "react";

const UserPosts = async ({ params }) => {
  const userData = await getUser(params.id);
  const userPosts = await getUserPosts(userData._id);

  return (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Posts" />

      <div className="flex flex-col gap-10">
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            creator={post.creator}
            caption={post.caption}
            tag={post.tag}
            postPhoto={post.postPhoto}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
