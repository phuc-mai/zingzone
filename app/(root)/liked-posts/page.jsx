"use client"

import { useUser } from '@clerk/nextjs'
import PostCard from '@components/cards/PostCard';
import Loader from '@components/loader';
import React, { useEffect, useState } from 'react'

const LikedPosts = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? <Loader /> : (
    <div className='flex flex-col gap-9'>
      {userData.likedPosts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          caption={post.caption}
          tag={post.tag}
          postPhoto={post.postPhoto}
          likes={post.likes}
          creator={post.creator}
          userId={user.id}
          triggerUpdate={getUser}
        />
      ))}
    </div>
  )
}

export default LikedPosts