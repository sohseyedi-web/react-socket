import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ChatsContainer = () => {
  return (
    <section className="h-screen overflow-y-hidden">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen bg-gradient-to-br from-neutral-800 to-zinc-800">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ChatsContainer;
