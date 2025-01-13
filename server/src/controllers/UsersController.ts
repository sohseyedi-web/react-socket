import { NextFunction, Request, Response } from "express";
import User from "../models/AuthModels";
import jwt from "jsonwebtoken";

export const getAllUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "توکن نامعتبر است" });
  }
};

export const userProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  next();
};
