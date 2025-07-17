import express from "express";
import { redirectTorignal, shortUrl } from "../Controllers/urlController.js";

const urlRouter = express.Router();

urlRouter.post("/shortUrl", shortUrl);
urlRouter.get("/:id", redirectTorignal);

export default urlRouter;
