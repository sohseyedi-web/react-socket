import { useCreateRoom } from "@/hooks/rooms/useRooms";
import { UserTypes } from "@/types";
import { NavLink } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  user: UserTypes;
  currentUser: string;
};

const UserLink = ({ to, user, currentUser }: CustomLinkProps) => {
  const navlinkClass =
    "flex gap-x-2 items-center w-full p-3 hover:bg-zinc-900  hover:text-zinc-100 transition-all duration-300";

  const { createRoom } = useCreateRoom();

  const onCreate = async () => {
    try {
      await createRoom({ userId1: user?._id, userId2: currentUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="w-full" onClick={onCreate}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${navlinkClass} bg-zinc-700 text-zinc-300`
            : `${navlinkClass} text-zinc-100`
        }
      >
        <img
          src={
            user?.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={user?.username}
          className="object-cover rounded-2xl size-12"
        />
        <div className="flex flex-col items-start">
          <h4>{user?.username}</h4>
          <p>{user?.email}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default UserLink;
