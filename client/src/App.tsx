import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ChatsContainer from "@/ui/chatLayout/ChatsContainer";
import Room from "@/features/room/Room";
import ProtectedRoute from "./ui/ProtectedRoutes";
import { useEffect } from "react";
import { useResponsiveStore } from "./store/useStore";

function App() {
  const { updateMedia } = useResponsiveStore();

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [updateMedia]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatsContainer />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/:roomId" element={<Room />} />
        </Route>
        <Route
          path="/join"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
