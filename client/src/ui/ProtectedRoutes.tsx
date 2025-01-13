import { useDetailUser } from "@/hooks/users/useUser";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useDetailUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <Suspense fallback={<Loading full={true} />}>
      {children ? children : <Outlet />}
    </Suspense>
  );
};

export default ProtectedRoute;
