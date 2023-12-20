"use client";

import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
import { Search, Add, Logout } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

      <div className="flex gap-3">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer gap-3 items-center md:hidden">
              <Logout sx={{ color: "white", fontSize: "30px" }} />
            </div>
          </SignOutButton>
        </SignedIn>

        <Link href={`/profile/${user.id}`}>
          <Image
            src={user.imageUrl}
            alt="profile photo"
            height={50}
            width={50}
            className="rounded-full md:hidden"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
