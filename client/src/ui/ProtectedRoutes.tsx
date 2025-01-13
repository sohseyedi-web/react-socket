import { useDetailUser } from "@/hooks/users/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useDetailUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/join", { replace: true });
    } else {
      navigate("/");
    }
  }, [user]);

  if (isLoading) {
    return <Loading full={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
