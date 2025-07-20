import userModel from "../Models/userModel.js";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { sendToken } from "../Utils/jwtToken.js";
import { AppError } from "../Utils/appError.js";

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (
    !username.trim() ||
    !email ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await userModel.create({
    username,
    email,
    password,
    confirmPassword,
  });

  sendToken(user, 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new AppError("Incorrect email or password", 401));
  }

  sendToken(user, 200, res);
});

export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { expire: new Date() })
    .json({ status: "success", message: "Logged out successfully" });
};

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    status: "success",
    total: users.length,
    data: {
      users,
    },
  });
});
export const getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new AppError("No user found with the provided ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
