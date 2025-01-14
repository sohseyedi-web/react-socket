import { Server } from "socket.io";
import Message from "../models/MessageModels";

const users: { [socketId: string]: string } = {};

const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId: string) => {
      if (!userId) {
        console.error("UserId is required");
        return;
      }

      users[socket.id] = userId;
      io.emit("onlineUsers", Object.values(users));
    });

    socket.on(
      "joinRoom",
      ({ userId, targetUserId }: { userId: string; targetUserId: string }) => {
        if (!userId || !targetUserId) {
          console.error("UserId and TargetUserId are required");
          return;
        }

        const room = [userId, targetUserId].sort().join("_");
        socket.join(room);
        socket.emit("roomJoined", room);
      }
    );

    socket.on(
      "sendMessage",
      async ({
        sender,
        receiver,
        message,
      }: {
        sender: string;
        receiver: string;
        message: string;
      }) => {
        if (!sender || !receiver || !message) {
          console.error("Sender, Receiver, and Message are required");
          return;
        }

        try {
          const room = [sender, receiver].sort().join("_");
          const newMessage = new Message({ sender, receiver, message, room });
          await newMessage.save();

          io.to(room).emit("receiveMessage", {
            id: newMessage._id,
            sender: newMessage.sender,
            message: newMessage.message,
            timestamp: newMessage.timestamp,
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );

    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("onlineUsers", Object.values(users));
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketHandler;
