"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Search, Add, Person } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dark } from "@clerk/themes";

const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { user } = useUser();
  if (!user) return null;

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

        <UserButton appearance={{ baseTheme: dark }} afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default TopBar;
