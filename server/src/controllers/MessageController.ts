import { Request, Response } from "express";
import Message from "../models/MessageModels";

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};
