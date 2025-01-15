import { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1D1D1D] to-[#2d2d2d]">
      <div className="lg:w-[35%] md:w-[70%] w-[90%] mx-auto p-4 bg-[#2A3335] rounded-2xl">
        <h1 className="lg:text-3xl text-2xl my-2 text-center text-[#f6f6f6] font-semibold">
          Socket App
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
