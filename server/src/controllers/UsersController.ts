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
    res.status(401).json({ message: "توکن وجود ندارد" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ message: "کاربر یافت نشد" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "توکن نامعتبر است" });
    }

    res.status(500).json({ message: "خطای سرور" });
  }
};
