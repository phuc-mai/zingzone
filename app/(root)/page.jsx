import { getFeedPosts } from "@app/api/post";
import { getUser } from "@app/api/user";
import { currentUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = JSON.parse(JSON.stringify(await currentUser()));
  if (!user) return null;

  const userData = JSON.parse(JSON.stringify(await getUser(user.id)));
  if (!userData) redirect("/create-profile");

  const feedPosts = JSON.parse(JSON.stringify(await getFeedPosts()));

  return (
    <div className="flex flex-col gap-10">
      {feedPosts.map((post) => {
        return (
          <PostCard
            key={post._id}
            id={post._id}
            creator={post.creator}
            caption={post.caption}
            tag={post.tag}
            postPhoto={post.postPhoto}
            userId={user.id}
            userData={userData}
          />
        );
      })}
    </div>
  );
}
