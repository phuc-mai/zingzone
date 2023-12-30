"use client";

import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Search, Add, Logout, Person } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dark } from "@clerk/themes";

const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { user } = useUser();
  if (!user) return null;

  // const [loading, setLoading] = useState(true);

  // const [userData, setUserData] = useState({});

  // const getUserData = async () => {
  //   const response = await fetch(`/api/users/${user.id}`);
  //   const data = await response.json();
  //   setUserData(data);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (user) {
  //     getUserData();
  //   }
  // }, [user]);

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people,..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="search-icon"
          onClick={() => router.push(`/search/posts/${search}`)}
        />
      </div>

      <button
        className="create-post-btn"
        onClick={() => router.push("/create-post")}
      >
        <Add />
        <p>Create a Post</p>
      </button>

      <div className="flex gap-4 md:hidden ">
        <Link href={`/profile/${user.id}/posts`}>
          <Person
            sx={{ color: "white", fontSize: "35px", cursor: "pointer" }}
          />
        </Link>

        <UserButton appearance={{ baseTheme: "dark" }} afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default TopBar;
