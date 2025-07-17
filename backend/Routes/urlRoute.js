import express from "express";
import {
  redirectTorignal,
  createShortUrl,
  getAllhortUrl,
} from "../Controllers/urlController.js";
import { protect } from "../Controllers/authController.js";

const urlRouter = express.Router();

urlRouter.get("/", getAllhortUrl);
urlRouter.post("/shortUrl", protect, createShortUrl);
urlRouter.get("/:id", redirectTorignal);

export default urlRouter;
