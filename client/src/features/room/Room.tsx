import { useAllUsers } from "@/hooks/users/useUser";
import HeaderRoom from "./HeaderRoom";
import Messages from "./Messages";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { UserTypes, MessageTypes } from "@/types";
import api from "@/service/https";
import { GET_ROOM_MESSAGES } from "@/service/urls";

const socket = io("http://localhost:5000");

const Room = () => {
  const { users } = useAllUsers();
  const { roomId } = useParams();
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const getRoomDetails = (roomId: string | undefined) => {
    if (!roomId) return { userId: "", targetUserId: "", room: "" };

    const [userId, targetUserId] = roomId.split("-");
    const room = [userId, targetUserId].sort().join("_");
    return { userId, targetUserId, room };
  };

  const { userId, targetUserId, room } = getRoomDetails(roomId);
  const currentUser = userId;
  const findUser =
    users?.find((user: UserTypes) => user?._id === targetUserId) || null;

  useEffect(() => {
    socket.emit("joinRoom", { userId, targetUserId });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [room, userId, targetUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(GET_ROOM_MESSAGES(room || ""));
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [room]);

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        room,
        sender: currentUser,
        receiver: findUser?._id,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <section className="flex flex-col h-screen">
      <HeaderRoom userName={findUser?.username} />
      <div className="flex-1 overflow-y-auto p-3 border-y border-zinc-400">
        <Messages currentUser={currentUser || ""} messages={messages} />
      </div>
      <form
        onSubmit={onSendMessage}
        className="w-full bg-zinc-100 py-2 px-3 flex items-center"
      >
        <input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="bg-transparent outline-none py-2 flex-1 text-zinc-800 text-lg"
        />
        <button>
          <IoSend size={32} className="text-zinc-700 cursor-pointer" />
        </button>
      </form>
    </section>
  );
};

export default Room;
