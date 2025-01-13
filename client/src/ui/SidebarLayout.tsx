const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const active = true;

  return (
    <aside
      className={`${
        active ? "w-[18%] left-0 top-0" : "-left-28 w-0 top-0"
      } fixed z-40 lg:relative bg-zinc-50 h-screen lg:h-auto border-r border-zinc-400 space-y-3 transition-all duration-300`}
    >
      {children}
    </aside>
  );
};

export default SidebarLayout;
