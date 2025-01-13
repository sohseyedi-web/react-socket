import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ChatsContainer = () => {
  return (
    <section className="h-screen overflow-y-hidden">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ChatsContainer;
