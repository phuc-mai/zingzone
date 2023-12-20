import { getPostsBySearch } from "@app/api/post";
import PostCard from "@components/cards/PostCard";
import Link from "next/link";

const Search = async ({ params }) => {
  const searchedPosts = await getPostsBySearch(params.query);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link
          className={`tab bg-purple-1`}
          href={`/search/posts/${params.query}`}
        >
          Posts
        </Link>
        <Link
          className={`tab bg-dark-2`}
          href={`/search/people/${params.query}`}
        >
          People
        </Link>
      </div>


      {searchedPosts.map((post) => (
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
};

export default Search;
