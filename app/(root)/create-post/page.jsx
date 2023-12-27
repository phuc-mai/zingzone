"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import Posting from "@components/forms/Posting";

const CreatePost = () => {
  const { user } = useUser();
  if (!user) return null;

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, [user.id]);

  const post = {
    creatorId: userData._id,
    creatorClerkId: userData.clerkId,
    caption: "",
    tag: "",
    postPhoto: null,
  }

  const apiRoute = "/api/post/new";

  return (
    <div className="pt-6">
      <Posting post={post} apiRoute={apiRoute} />
    </div>
  );
};

export default CreatePost;
