import { useResponsiveStore } from "@/store/useStore";
import Back from "./Back";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { active } = useResponsiveStore();

  return (
    <>
      <Back />
      <aside
        className={`${
          active ? " left-0 top-0" : "-left-80 top-0"
        } fixed z-40 w-[300px] lg:relative bg-zinc-50 h-screen lg:h-auto border-r border-zinc-400 space-y-3 transition-all duration-300`}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarLayout;
