import express from "express";
import {
  getUser,
  getUsers,
  login,
  register,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id", getUser);

export default userRouter;
