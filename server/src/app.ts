import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import messageRoutes from "./routes/MessageRoutes";
import authRoutes from "./routes/AuthRoutes";
import usersRoutes from "./routes/UsersRoutes";
import roomsRoutes from "./routes/RoomsRoutes";
import socketHandler from "./socket/socket";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", messageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
