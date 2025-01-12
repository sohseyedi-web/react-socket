import SidebarLayout from "../SidebarLayout";
import { RiMenu2Line } from "react-icons/ri";
import UserLink from "./UserLink";
import { useAllUsers, useDetailUser } from "@/hooks/users/useUser";

const Sidebar = () => {
  const { users } = useAllUsers();
  const {
    user: { _id: userId },
  } = useDetailUser();

  const filterUsers = users?.filter((item: any) => item?._id !== userId);

  return (
    <SidebarLayout>
      <div className="flex items-center gap-x-2 p-3">
        <RiMenu2Line size={32} className="text-zinc-300 cursor-pointer" />
        <input
          className="w-full h-[45px] outline-none rounded-[18px] border-2 border-zinc-300 px-3"
          placeholder="Search"
        />
      </div>
      <ul className="flex flex-col gap-y-4 w-full">
        {filterUsers?.map((user: any) => (
          <UserLink
            to={`/${user?._id}-${userId}`}
            username={user?.username}
            fullname={user?.email}
            src={user?.profilePicture}
            key={user?._id}
          />
        ))}
      </ul>
    </SidebarLayout>
  );
};

export default Sidebar;
