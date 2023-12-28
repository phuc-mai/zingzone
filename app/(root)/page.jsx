"use client";

import { useEffect, useState } from "react";

import PostCard from "@components/cards/PostCard";
import Loader from "@components/loader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const { user, isLoaded } = useUser();

  const router = useRouter();

  const [feedPosts, setFeedPosts] = useState([]);

  const getFeedPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setFeedPosts(data);
    setLoading(false);
  };

  useEffect(() => {
      getFeedPosts();
  }, []);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      {feedPosts.map((post) => {
        return (
          <PostCard
            key={post._id}
            id={post._id}
            creator={post.creator}
            caption={post.caption}
            tag={post.tag}
            postPhoto={post.postPhoto}
            likes={post.likes}
            userId={user.id}
            router={router}
            triggerUpdate={getFeedPosts}
          />
        );
      })}
    </div>
  );
}
