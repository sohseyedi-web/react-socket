import { useAllUsers } from "@/hooks/users/useUser";
import { UserTypes } from "@/types";
import { RiSearch2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";

const HeaderRoom = () => {
  const { roomId } = useParams();
  const { users } = useAllUsers();

  const findUser = users?.find(
    (user: UserTypes) => user?._id === roomId?.split("-")[0]
  );

  return (
    <header className="px-3 py-2 flex items-center border-b justify-between">
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold">{findUser?.username}</h4>
        <span className="text-sm">online</span>
      </div>
      <div className="flex gap-x-2">
        <RiSearch2Line size={28} className="cursor-pointer text-zinc-500" />
      </div>
    </header>
  );
};

export default HeaderRoom;
