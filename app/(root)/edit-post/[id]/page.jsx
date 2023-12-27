"use client";

import { useUser } from "@clerk/nextjs";
import Posting from "@components/forms/Posting";
import Loader from "@components/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPost = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [postData, setPostData] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`/api/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPostData(data);
        setLoading(false);
      } catch (err) {
        console.log("Get post failed", err.message);
      }
    };

    getPost();
  }, [id]);

  
  const { user } = useUser();
  if (!user) return null;

  const post = {
    creatorClerkId: user.id,
    caption: postData?.caption,
    tag: postData?.tag,
    postPhoto: postData?.postPhoto,
  };

  const apiRoute = `/api/post/${id}`;

  return loading ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <Posting post={post} apiRoute={apiRoute} />
    </div>
  );
};

export default EditPost;
