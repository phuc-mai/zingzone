import { getUser } from "@app/api/user";
import { currentUser } from "@clerk/nextjs";

import ProfileInfo from "@components/forms/ProfileInfo"

const EditProfile = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await getUser(user.id);
  if (!userData) redirect("/create-profile");

  const profileInfo = {
    clerkId: userData?.clerkId,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    username: userData?.username,
    bio: userData?.bio,
    profilePhoto: userData?.profilePhoto
  }

  return (
    <div>
      <ProfileInfo user={profileInfo} />
    </div>
  )
}

export default EditProfile