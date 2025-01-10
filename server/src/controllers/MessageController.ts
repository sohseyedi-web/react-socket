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

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { room } = req.params;
    const { senderId, text } = req.body;

    if (!senderId || !text) {
      res.status(400).json({ message: "senderId and text are required" });
      return;
    }

    const newMessage = new Message({
      room,
      senderId,
      text,
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};
