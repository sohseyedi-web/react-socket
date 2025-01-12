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
  try {
    const decoded = jwt.decode(token) as any;
    const user = await User.findById(decoded.userId);
    res.status(200).json(user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "توکن نامعتبر است" });
  }
};
