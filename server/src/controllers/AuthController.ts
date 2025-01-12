import { CookieOptions, NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/AuthModels";
import { generateAccessToken, generateRefreshToken } from "../utils/functions";
import { loginSchema, registerSchema } from "../validators/userSchema";
import createHttpError from "http-errors";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;

  try {
    await registerSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "ایمیل مورد نظر قبلاً ثبت‌نام شده است." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const user = await User.findOne({ email });

    const accessToken = generateAccessToken(String(newUser?._id));
    const refreshToken = generateRefreshToken(String(newUser?._id));

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "ثبت نام موفق بود", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطایی رخ داده است." });
    next();
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await loginSchema.validateAsync(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError.NotFound("کاربری یافت نشد");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return createHttpError.InternalServerError("رمز عبور اشتباه است");
    }

    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = (res: Response) => {
  const cookieOptions: CookieOptions = {
    maxAge: 1,
    expires: new Date(Date.now()),
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    domain:
      process.env.NODE_ENV === "development" ? "localhost" : ".example.ir",
  };
  res.cookie("accessToken", null, cookieOptions);
  res.cookie("refreshToken", null, cookieOptions);

  return res.status(200).json({
    StatusCode: 200,
    message: "با موفقیت خارج شدی",
  });
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(403).json({ message: "No refresh token" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!
    ) as { userId: string };

    const newAccessToken = generateAccessToken(decoded.userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 45 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
