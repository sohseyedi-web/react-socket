import SidebarLayout from "../SidebarLayout";
import { RiMenu2Line } from "react-icons/ri";
import UserLink from "./UserLink";
import { useDetailUser } from "@/hooks/users/useUser";

const Sidebar = () => {
  const { data } = useDetailUser();

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
        <UserLink
          to={`/${data?.data?._id}-${"135976412165464"}`}
          username={data?.data?.username}
          fullname={data?.data?.email}
          src={data?.data?.profilePicture}
          key={data?.data?._id}
        />
      </ul>
    </SidebarLayout>
  );
};

export default Sidebar;
