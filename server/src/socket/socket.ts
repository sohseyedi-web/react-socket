import { Server } from "socket.io";
import Message from "../models/MessageModels";

const users: { [socketId: string]: string } = {};

const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      users[socket.id] = userId;
      io.emit("onlineUsers", Object.values(users));
    });

    socket.on("joinRoom", ({ userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      socket.join(room);
      socket.emit("roomJoined", room);
    });

    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      const room = [sender, receiver].sort().join("_");
      const newMessage = new Message({ sender, receiver, message, room });
      await newMessage.save();

      io.to(room).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("onlineUsers", Object.values(users));
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
