"use client"

import { useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import ProfileCard from "@components/cards/ProfileCard";
import Loader from "@components/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPosts = () => {
  const { user, isLoaded } = useUser();
  
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);

  return loading || !isLoaded ? <Loader /> : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab="Posts" />

      <div className="flex flex-col gap-10">
        {userData.posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            caption={post.caption}
            tag={post.tag}
            postPhoto={post.postPhoto}
            likes={post.likes}
            creator={userData}
            userId={user.id}
            triggerUpdate={getUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
