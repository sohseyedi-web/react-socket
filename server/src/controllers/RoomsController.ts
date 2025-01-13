import User from "../models/AuthModels";
import Rooms from "../models/RoomsModels";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.body;

  const user1 = await User.findById(userId1);
  const user2 = await User.findById(userId2);

  if (!user1 || !user2) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const existingRoom = await Rooms.findOne({
    userIds: { $all: [user1._id, user2._id] },
  });

  if (existingRoom) {
    res.status(200).send({ roomId: existingRoom._id });
    return;
  }

  const room = new Rooms({ userIds: [user1._id, user2._id] });
  try {
    await room.save();
    res.status(201).send({ roomId: room._id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating room" });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
