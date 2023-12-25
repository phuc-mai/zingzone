import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ProfileInfo from "@components/forms/ProfileInfo";

const CreateProfile = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profileInfo = {
    clerkId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    bio: "",
    profilePhoto: user.imageUrl ? user.imageUrl : null,
  }

  return (
    <div className="mx-auto flex flex-col max-w-xl px-10 py-16">
      <h1 className="text-heading1-bold text-light-1">Create Profile</h1>
      <p className="text-body-normal text-light-1 mt-2 mb-6">
        Complete your information to start joining ZingZone
      </p>
      <ProfileInfo user={profileInfo} />
    </div>
  );
};

export default CreateProfile;
