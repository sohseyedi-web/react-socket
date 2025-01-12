import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ChatsContainer from "./ui/chatLayout/ChatsContainer";
import Chats from "./features/chats/Chats";
import Room from "./features/room/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatsContainer />}>
          <Route path="" element={<Chats />} />
          <Route path="/:roomId" element={<Room />} />
        </Route>
        <Route path="/join" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
