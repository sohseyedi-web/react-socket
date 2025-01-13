import Chats from "@/features/chats/Chats";
import { useResponsiveStore } from "@/store/useStore";
import { RiMenu2Line } from "react-icons/ri";

const Home = () => {
  const { active, setActive } = useResponsiveStore();

  return (
    <section className="relative">
      <div className="absolute top-4 left-5 lg:hidden flex">
        <RiMenu2Line
          onClick={() => setActive(!active)}
          size={28}
          className="text-zinc-500 cursor-pointer"
        />
      </div>
      <Chats />
    </section>
  );
};

export default Home;
