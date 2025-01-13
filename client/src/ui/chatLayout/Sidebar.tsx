import { useState } from "react";
import SidebarLayout from "../SidebarLayout";
import { RiMenu2Line } from "react-icons/ri";
import UserLink from "./UserLink";
import { useAllUsers, useDetailUser } from "@/hooks/users/useUser";
import { UserTypes } from "@/types";

const Sidebar = () => {
  const { users } = useAllUsers();
  const {
    user: { _id: userId },
  } = useDetailUser();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter(
    (user: UserTypes) =>
      user?._id !== userId &&
      (user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <SidebarLayout>
      <div className="flex items-center gap-x-2 p-3">
        <RiMenu2Line size={38} className="text-zinc-500 cursor-pointer" />
        <input
          className="w-full h-[45px] outline-none rounded-[18px] border border-zinc-400 px-3"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="flex flex-col w-full">
        {searchTerm &&
          filteredUsers?.map((user: UserTypes) => (
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
