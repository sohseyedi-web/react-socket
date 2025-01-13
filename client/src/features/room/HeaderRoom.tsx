import { useAllUsers } from "@/hooks/users/useUser";
import { UserTypes } from "@/types";
import { RiMenu2Line, RiSearch2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";

const HeaderRoom = () => {
  const { roomId } = useParams();
  const { users } = useAllUsers();

  const findUser = users?.find(
    (user: UserTypes) => user?._id === roomId?.split("-")[0]
  );

  return (
    <header className="lg:px-3 px-2 py-2 flex items-center border-b justify-between">
      <div className="flex items-center gap-x-2 bg-white">
        <div className="flex items-center">
          <RiMenu2Line
            size={25}
            className="text-zinc-300 cursor-pointer lg:hidden flex mr-3"
          />
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
            className="size-9 rounded-2xl lg:hidden flex"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">{findUser?.username}</h4>
          <span className="text-sm">online</span>
        </div>
      </div>
      <div className="flex gap-x-2">
        <RiSearch2Line size={28} className="cursor-pointer text-zinc-500" />
      </div>
    </header>
  );
};

export default HeaderRoom;
