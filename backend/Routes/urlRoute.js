import express from "express";
import {
  redirectTorignal,
  createShortUrl,
  getAllhortUrl,
} from "../Controllers/urlController.js";

const urlRouter = express.Router();

urlRouter.get("/", getAllhortUrl);
urlRouter.post("/shortUrl", createShortUrl);
urlRouter.get("/:id", redirectTorignal);

export default urlRouter;
