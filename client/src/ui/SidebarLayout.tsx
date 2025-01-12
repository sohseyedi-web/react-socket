const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const active = true;

  return (
    <aside
      className={`${
        active ? "w-[25%] right-0 top-0" : "-right-28 w-0 top-0"
      } fixed z-40 lg:relative bg-zinc-700 h-screen lg:h-auto border-r-2 space-y-3 transition-all duration-300`}
    >
      {children}
    </aside>
  );
};

export default SidebarLayout;
