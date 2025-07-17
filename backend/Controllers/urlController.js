import url from "../Models/urlModel.js";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { AppError } from "../Utils/appError.js";

export const createShortUrl = asyncHandler(async (req, res, next) => {
  const originalUrl = req.body.url;
  let shortId = req.body.shortId;
  const userId = req.user._id;

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
  }

  const data = await url.create({ shortId, originalUrl, userId });

  res.status(200).json({
    status: "success",
    data: {
      data,
      shortUrl: `localhost:3000/${shortId}`,
    },
  });
});

export const redirectTorignal = asyncHandler(async (req, res) => {
  const shortId = req.params.id;
  const data = await url.findOne({ shortId });

  if (!data) {
    return next(new AppError("Page not found", 404));
  }

  res.status(200).json({
    status: "success",
    originalUrl: data.originalUrl,
  });
});

export const getAllhortUrl = asyncHandler(async (req, res, next) => {
  const data = await url.find();
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});

export const getUserhortUrl = (req, res, next) => {};
