import { Request, Response } from "express";
import User from "../models/AuthModels";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "username email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "❌ خطا در دریافت کاربران", error });
  }
};
