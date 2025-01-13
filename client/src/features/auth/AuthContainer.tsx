import { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="lg:w-[35%] md:w-[70%] w-[90%] mx-auto p-4 bg-zinc-100 rounded-2xl border">
        <h1 className="lg:text-3xl text-2xl my-2 text-center text-zinc-700 font-semibold">
          Socket App
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
