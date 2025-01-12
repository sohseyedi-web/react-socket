import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ChatsContainer = () => {
  return (
    <section className="max-w-7xl mx-auto bg-gray-200 h-screen overflow-y-hidden container" dir="ltr">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-300 h-screen">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default ChatsContainer;
