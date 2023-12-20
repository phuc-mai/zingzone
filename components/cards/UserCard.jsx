import { currentUser } from "@clerk/nextjs";
import { PersonAddAlt } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const UserCard = async ({ user }) => {
  const userLoggedIn = await currentUser();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src={user.profilePhoto}
          alt="profile photo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-small-semibold text-light-1">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-subtle-medium text-light-3">@{user.username}</p>
        </div>
      </div>

      {userLoggedIn.id !== user.clerkId && (
        <PersonAddAlt sx={{ color: "#7857FF", cursor: "pointer" }}/>
      )}
    </div>
  );
};

export default UserCard;
