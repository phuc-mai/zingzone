"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/loader";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserCard = ({ userData, updateTrigger }) => {
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
      updateTrigger()
    } catch (error) {
      console.log(error);
    }
  };

  return !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src={userData.profilePhoto}
          alt="profile photo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-small-semibold text-light-1">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-subtle-medium text-light-3">
            @{userData.username}
          </p>
        </div>
      </div>

      {user?.id !== userData?.clerkId &&
        (isFollowing ? (
          <PersonRemove
            sx={{ color: "#7857FF", cursor: "pointer" }}
            onClick={() => handleFollow()}
          />
        ) : (
          <PersonAddAlt
            sx={{ color: "#7857FF", cursor: "pointer" }}
            onClick={() => handleFollow()}
          />
        ))}
    </div>
  );
};

export default UserCard;
