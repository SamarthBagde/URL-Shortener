import express from "express";
import {
  redirectTorignal,
  createShortUrl,
  getAllhortUrl,
  getUserhortUrl,
  updateUrl,
  deleteUrl,
} from "../Controllers/urlController.js";
import { protect } from "../Controllers/authController.js";

const urlRouter = express.Router();

urlRouter.get("/", getAllhortUrl);
urlRouter.get("/user-urls", protect, getUserhortUrl);
urlRouter.post("/shortUrl", protect, createShortUrl);
urlRouter.get("/:shortId", redirectTorignal);
urlRouter.patch("/:urlId", protect, updateUrl);
urlRouter.delete("/:urlId", protect, deleteUrl);

export default urlRouter;
