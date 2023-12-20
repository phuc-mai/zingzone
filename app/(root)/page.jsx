import { getFeedPosts } from "@app/api/post";
import { getUser } from "@app/api/user";
import { currentUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userData = await getUser(user.id);
  if (!userData) redirect("/create-profile");

  const feedPosts = await getFeedPosts();

  return (
    <div className="flex flex-col gap-10">
      {feedPosts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          creator={post.creator}
          caption={post.caption}
          tag={post.tag}
          postPhoto={post.postPhoto}
        />
      ))}
    </div>
  );
}
