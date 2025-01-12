import Chats from "@/features/chats/Chats";
import { useDetailUser } from "@/hooks/users/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useDetailUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/join", { replace: true });
    }
  }, [user, navigate]);

  return <Chats />;
};

export default Home;
