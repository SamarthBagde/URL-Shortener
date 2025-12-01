import urlModel from "../Models/urlModel.js";
import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { AppError } from "../Utils/appError.js";
import { customAlphabet } from "nanoid";
import redisClient from "../Config/redisCilent.js";

export const createShortUrl = asyncHandler(async (req, res, next) => {
  const destinationUrl = req.body.destinationUrl;
  const title = req.body.title;
  let shortId = req.body.backHalf;
  const userId = req.user._id;

  shortId = shortId.trim();

  shortId = shortId.replace(" ", "-");

  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    6
  );

  if (!shortId) {
    shortId = nanoid();
  }

  if (!destinationUrl || !title) {
    return next(
      new AppError("Please provide both destination url and title", 400)
    );
  }

  const data = await urlModel.create({
    title,
    shortId,
    destinationUrl,
    userId,
  });

  await redisClient.del(`user:urls:${userId}`);

  res.status(200).json({
    status: "success",
    data: {
      data,
      shortUrl: `localhost:5173/${shortId}`,
    },
  });
});

export const redirectTorignal = asyncHandler(async (req, res, next) => {
  const shortId = req.params.shortId;

  //first check in cache

  const cachedUrl = await redisClient.get(`shortId:${shortId}`);

  //if hit return res

  if (cachedUrl) {
    return res.status(200).json({
      status: "success",
      type: "cached",
      destinationUrl: cachedUrl,
    });
  }

  //if miss get data from db
  const data = await urlModel.findOne({ shortId });

  if (!data) {
    return next(new AppError("Page not found", 404));
  }

  //store in cache for future use

  await redisClient.set(`shortId:${shortId}`, data.destinationUrl, "EX", 3600); // 1 hour TTL -> 3600 sec

  //return res

  res.status(200).json({
    status: "success",
    destinationUrl: data.destinationUrl,
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

export const getUserShortUrl = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString(); // ensure it's a string

  // 1. Try to get from Redis
  const cachedUrls = await redisClient.get(`user:urls:${userId}`);

  if (cachedUrls) {
    // 2. If present, return cached data
    const urls = JSON.parse(cachedUrls);
    return res.status(200).json({
      status: "success",
      type: "cached",
      total: urls.length,
      data: {
        urls,
      },
    });
  }

  // 3. Else, get from MongoDB
  const urls = await urlModel.find({ userId });

  // 4. Save to Redis (cache for 5 mins)
  await redisClient.set(`user:urls:${userId}`, JSON.stringify(urls), "EX", 300);

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
  const { newDestinationUrl, newTitle } = req.body;
  const userId = req.user._id;

  // if (!newDestinationUrl) {
  //   return next(new AppError("Please enter url", 400));
  // }

  const url = await urlModel.findOne({ _id: urlId, userId });

  if (!url) {
    return next(
      new AppError("URL not found or you do not have permission", 403)
    );
  }

  if (newDestinationUrl) {
    url.destinationUrl = newDestinationUrl;
  }

  if (newTitle) {
    url.title = newTitle;
  }

  await url.save();
  await redisClient.del(`shortId:${url.shortId}`); // invalidating the cache for that url
  await redisClient.del(`user:urls:${userId}`);

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
  await redisClient.del(`shortId:${url.shortId}`);
  await redisClient.del(`user:urls:${userId}`);

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
