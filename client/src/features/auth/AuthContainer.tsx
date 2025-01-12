import { useDetailUser } from "@/hooks/users/useUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const { user } = useDetailUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="lg:w-[35%] md:w-[70%] w-[90%] mx-auto p-4 bg-zinc-100 rounded-2xl border">
        <h1 className="lg:text-3xl text-2xl my-2 text-center text-zinc-700 font-semibold">
          سوکت اپ
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
