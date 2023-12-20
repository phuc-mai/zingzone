import { currentUser } from "@clerk/nextjs";
import { tabs } from "@constants";
import { PersonAddAlt } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async ({ userData, activeTab }) => {
  const userLoggedIn = await currentUser();

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-start justify-between">
        <div className="flex gap-5 items-start">
          <div className="flex flex-col gap-3">
            <Image
              src={userData.profilePhoto}
              alt="profile photo"
              width={100}
              height={100}
              className="rounded-full md:max-lg:hidden"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-light-1 text-heading3-bold max-sm:text-heading4-bold">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-light-3 text-subtle-semibold">
              @{userData.username}
            </p>
            <p className="text-light-1 text-small-normal">{userData.bio}</p>
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

        {userLoggedIn.id !== userData.clerkId && (
          <PersonAddAlt
            sx={{ color: "#7857FF", fontSize: "40px", cursor: "pointer" }}
          />
        )}
      </div>

      <div className="flex gap-6">
        {tabs.map((tab) => (
          <Link
          className={`tab ${activeTab === tab.name ? "bg-purple-1" : "bg-dark-2"}`}
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
