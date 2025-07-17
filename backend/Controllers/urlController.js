import url from "../Models/urlModel.js";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { AppError } from "../Utils/appError.js";

export const shortUrl = asyncHandler(async (req, res, next) => {
  const originalUrl = req.body.url;
  let shortId = req.body.shortId;

  const { customAlphabet } = await import("nanoid"); // dynamic import
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    6
  );
  if (!shortId) {
    shortId = nanoid();
  }

  if (!originalUrl) {
    return next(new AppError("URL is required", 400));
    // return res.status(400).json({
    //   status: "failed",
    //   message: "URL is required",
    // });
  }
  const check = await url.findOne({ shortId });

  if (check) {
    return next(
      new AppError(
        "This exact back-half already exists and cannot be duplicated.",
        400
      )
    );
    // return res.status(409).json({
    //   status: "failed",
    //   message: "This exact back-half already exists and cannot be duplicated.",
    // });
  }

  await url.create({ shortId, originalUrl });

  res.status(200).json({
    status: "success",
    shortUrl: `localhost:3000/${shortId}`,
  });
});

export const redirectTorignal = asyncHandler(async (req, res) => {
  const shortId = req.params.id;
  const data = await url.findOne({ shortId });

  if (!data) {
    return res.status(404).json({
      status: "failed",
      message: "Page not found",
    });
  }
  const originalUrl = data.originalUrl;

  res.status(200).json({
    status: "success",
    originalUrl: originalUrl,
  });
});
