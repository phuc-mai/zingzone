import { getAllUsers } from "@app/api/user";
import UserCard from "@components/cards/UserCard";

const RightSideBar = async () => {
  const users = await getAllUsers();

  return (
    <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h4 className="text-heading4-bold text-light-1">Following</h4>
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-heading4-bold text-light-1">Suggested people</h4>
      </div>
    </div>
  );
};

export default RightSideBar;
