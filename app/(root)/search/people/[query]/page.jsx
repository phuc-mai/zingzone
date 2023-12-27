"use client";

import UserCard from "@components/cards/UserCard";
import Loader from "@components/loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedUsers, setSearchedUsers] = useState([]);

  const getSearchedUsers = async () => {
    try {
      const response = await fetch(`/api/user/search/${query}`);
      const data = await response.json();
      setSearchedUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedUsers();
  }, [query]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className={`tab bg-dark-2`} href={`/search/posts/${query}`}>
          Posts
        </Link>
        <Link className={`tab bg-purple-1`} href={`/search/people/${query}`}>
          People
        </Link>
      </div>

      {searchedUsers.map((user) => (
        <UserCard userData={user} />
      ))}
    </div>
  );
};

export default SearchPeople;
