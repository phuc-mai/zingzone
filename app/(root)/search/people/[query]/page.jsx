import { getUsersBySearch } from "@app/api/user";
import UserCard from "@components/cards/UserCard";
import Link from "next/link";

const Search = async ({ params }) => {
  const searchedUsers = await getUsersBySearch(params.query);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link
          className={`tab bg-dark-2`}
          href={`/search/posts/${params.query}`}
        >
          Posts
        </Link>
        <Link
          className={`tab bg-purple-1`}
          href={`/search/people/${params.query}`}
        >
          People
        </Link>
      </div>

      {searchedUsers.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default Search;
