import express from "express";
import {
  redirectTorignal,
  createShortUrl,
  getAllhortUrl,
  getUserShortUrl,
  updateUrl,
  deleteUrl,
} from "../Controllers/urlController.js";
import { protect } from "../Controllers/authController.js";

const urlRouter = express.Router();

urlRouter.get("/", getAllhortUrl);
urlRouter.get("/user-urls", protect, getUserShortUrl);
urlRouter.post("/shortUrl", protect, createShortUrl);
urlRouter.get("/:shortId", redirectTorignal);
urlRouter.patch("/update/:urlId", protect, updateUrl);
urlRouter.delete("/delete/:urlId", protect, deleteUrl);

export default urlRouter;
