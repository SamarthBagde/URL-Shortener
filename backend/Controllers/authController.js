import jwt from "jsonwebtoken";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import userModel from "../Models/userModel.js";
import { AppError } from "../Utils/appError.js";

export const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new AppError("You are not logged in please log in to get access", 401)
    );
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await userModel.findById(decode.id);

  if (!user) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  req.user = user;

  next();
});

export const authUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Authentication failed", 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModel.findById(decode.id);

  res.status(200).json({
    status: "success",
    authenticated: true,
    user,
  });
});
