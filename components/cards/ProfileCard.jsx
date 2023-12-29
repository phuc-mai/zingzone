"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/loader";
import { tabs } from "@constants";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileCard = ({ userData, activeTab }) => {
  const { user, isLoaded } = useUser();

  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, []);

  const isFollowing = userInfo?.following?.find(
    (item) => item._id === userData._id
  );

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `/api/user/${user.id}/follow/${userData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  return !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <div className="flex items-start justify-between">
        <div className="flex gap-5 items-start">
          <Image
            src={userData.profilePhoto}
            alt="profile photo"
            width={100}
            height={100}
            className="rounded-full md:max-lg:hidden"
          />

          <div className="flex flex-col gap-3">
            <p className="text-light-1 text-heading3-bold max-sm:text-heading4-bold">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-light-3 text-subtle-semibold">
              @{userData.username}
            </p>
            <div className="flex gap-7 text-small-bold max-sm:gap-4">
              <div className="flex gap-2 max-sm:flex-col items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData.posts.length}</p>
                <p className="text-light-1">Posts</p>
              </div>
              <div className="flex gap-2 max-sm:flex-col items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData.followers.length}</p>
                <p className="text-light-1">Followers</p>
              </div>
              <div className="flex gap-2 max-sm:flex-col items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData.following.length}</p>
                <p className="text-light-1">Following</p>
              </div>
            </div>
          </div>
        </div>
        {user?.id !== userData?.clerkId &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ))}{" "}
      </div>

      <div className="flex gap-6">
        {tabs.map((tab) => (
          <Link
            className={`tab ${
              activeTab === tab.name ? "bg-purple-1" : "bg-dark-2"
            }`}
            href={`/profile/${userData.clerkId}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
