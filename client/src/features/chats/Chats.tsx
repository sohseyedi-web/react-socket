import { LuMessageSquare } from "react-icons/lu";

const Chats = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-md text-center space-y-6 text-zinc-100">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center
             justify-center animate-bounce shadow-lg"
            >
              <LuMessageSquare className="w-8 h-8 text-zinc-400" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to SockeTapp!</h2>
        <p className="text-sm">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </section>
  );
};

export default Chats;
