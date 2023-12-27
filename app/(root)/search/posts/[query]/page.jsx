"use client"

import PostCard from "@components/cards/PostCard";
import Loader from "@components/loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPosts, setSearchedPosts] = useState([]);

  const getSearchedPosts = async () => {
    try {
      const response = await fetch(`/api/post/search/${query}`);
      const data = await response.json();
      setSearchedPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSearchedPosts();
  }, [query]);

  return loading ? <Loader /> : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link
          className={`tab bg-purple-1`}
          href={`/search/posts/${query}`}
        >
          Posts
        </Link>
        <Link
          className={`tab bg-dark-2`}
          href={`/search/people/${query}`}
        >
          People
        </Link>
      </div>


      {searchedPosts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          creator={post.creator}
          caption={post.caption}
          tag={post.tag}
          postPhoto={post.postPhoto}
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default Search;
