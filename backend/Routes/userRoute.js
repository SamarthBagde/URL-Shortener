import express from "express";
import {
  getUser,
  getUsers,
  login,
  logout,
  register,
} from "../Controllers/userController.js";
import { authUser } from "../Controllers/authController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/register", register);
userRouter.get("/logout", logout);
userRouter.get("/auth-check", authUser);
userRouter.post("/login", login);
userRouter.get("/:id", getUser);

export default userRouter;
