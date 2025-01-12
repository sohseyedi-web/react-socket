import { useAuthorize } from "@/hooks/users/useAuthorize";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const { isAuthenticated } = useAuthorize();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/join", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="px-3 py-1 bg-zinc-500 text-zinc-100 rounded-xl font-semibold">
        Select a chat to start messaging
      </div>
    </section>
  );
};

export default Chats;
