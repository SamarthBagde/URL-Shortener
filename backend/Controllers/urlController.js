import urlModel from "../Models/urlModel.js";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { AppError } from "../Utils/appError.js";
import { customAlphabet } from "nanoid";
import redisClient from "../Config/redisCilent.js";

export const createShortUrl = asyncHandler(async (req, res, next) => {
  const originalUrl = req.body.url;
  let shortId = req.body.shortId;
  const userId = req.user._id;

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

  const data = await urlModel.create({ shortId, originalUrl, userId });

  res.status(200).json({
    status: "success",
    data: {
      data,
      shortUrl: `localhost:3000/${shortId}`,
    },
  });
});

export const redirectTorignal = asyncHandler(async (req, res, next) => {
  const shortId = req.params.shortId;

  //first check in cache

  const cachedUrl = await redisClient.get(`shortId:${shortId}`);

  //if hit return res

  if (originalUrl) {
    return res.status(200).json({
      status: "success",
      type: "cached data",
      originalUrl: cachedUrl,
    });
  }

  //if miss get data from db
  const data = await urlModel.findOne({ shortId });

  if (!data) {
    return next(new AppError("Page not found", 404));
  }

  //store in cache for future use

  await redisClient.set(`shortId:${shortId}`, data.originalUrl, "EX", 3600); // 1 hour TTL -> 3600 sec

  //return res

  res.status(200).json({
    status: "success",
    originalUrl: data.originalUrl,
  });
});

export const getAllhortUrl = asyncHandler(async (req, res, next) => {
  const urls = await urlModel.find();
  res.status(200).json({
    status: "success",
    total: urls.length,
    data: {
      urls,
    },
  });
});

export const getUserhortUrl = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const urls = await urlModel.find({ userId });

  res.status(200).json({
    status: "success",
    total: urls.length,
    data: {
      urls,
    },
  });
});

export const updateUrl = asyncHandler(async (req, res, next) => {
  const urlId = req.params.urlId;
  const { newUrl } = req.body;
  const userId = req.user._id;

  if (!newUrl) {
    return next(new AppError("Please enter url", 400));
  }

  const url = await urlModel.findOne({ _id: urlId, userId });

  if (!url) {
    return next(
      new AppError("URL not found or you do not have permission", 403)
    );
  }

  url.originalUrl = newUrl;
  await url.save();
  await redisClient.del(`shortId:${url.shortId}`); // invalidating the cache for that url

  res.status(200).json({
    status: "success",
    data: {
      url,
    },
  });
});

export const deleteUrl = asyncHandler(async (req, res, next) => {
  const urlId = req.params.urlId;
  const userId = req.user._id;

  const url = await urlModel.findOneAndDelete({ _id: urlId, userId });

  if (!url) {
    return next(
      new AppError("URL not found or you do not have permission", 403)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
