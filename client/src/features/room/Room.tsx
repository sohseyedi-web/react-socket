import { useDetailUser } from "@/hooks/users/useUser";
import HeaderRoom from "./HeaderRoom";
import Messages from "./Messages";
import { IoSend } from "react-icons/io5";

const Room = () => {
  const { user } = useDetailUser();

  return (
    <section className="flex flex-col h-screen">
      <HeaderRoom />
      <div className="flex-1 overflow-y-auto p-3">
        <Messages userId={user?._id} />
      </div>
      <form className="w-full bg-gray-950 py-2 px-3 flex items-center">
        <input
          type="text"
          placeholder="Write a message..."
          className="bg-transparent outline-none py-2 flex-1 text-white text-lg"
        />
        <button>
          <IoSend size={32} className="text-zinc-500 cursor-pointer" />
        </button>
      </form>
    </section>
  );
};

export default Room;
