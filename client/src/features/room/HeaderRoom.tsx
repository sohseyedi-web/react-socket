import { RiMenu2Line, RiSearch2Line } from "react-icons/ri";

const HeaderRoom = ({ userName }: { userName: string }) => {
  return (
    <header className="lg:px-3 px-2 py-2 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center">
          <RiMenu2Line
            size={25}
            className="text-zinc-500 cursor-pointer lg:hidden flex mr-3"
          />
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
            className="size-10 rounded-2xl lg:hidden flex"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{userName}</h4>
          <span className="text-sm text-zinc-400">online</span>
        </div>
      </div>
      <div className="flex gap-x-2">
        <RiSearch2Line size={28} className="cursor-pointer text-zinc-500" />
      </div>
    </header>
  );
};

export default HeaderRoom;
