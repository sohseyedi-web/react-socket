import { NavLink } from "react-router-dom";

type CustomLinkProps = {
  to: string;
  src: string;
  username: string;
  fullname: string;
};

const UserLink = ({ username, to, src, fullname }: CustomLinkProps) => {
  const navlinkClass =
    "flex gap-x-2 items-center text-white w-full p-3 hover:bg-zinc-600  hover:bg-zinc-600 transition-all duration-300";

  return (
    <li className="w-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${navlinkClass} bg-zinc-800`
            : `${navlinkClass}`
        }
      >
        <img
          src={
            src ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={username}
          className="object-cover rounded-2xl size-12"
        />
        <div className="flex flex-col items-start">
          <h4>{username}</h4>
          <p>{fullname}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default UserLink;
