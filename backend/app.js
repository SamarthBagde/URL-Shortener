const express = require("express");
const url = require("./models/url");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const shortUrl = async (req, res) => {
  try {
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
      return res.status(400).json({
        status: "failed",
        message: "URL is required",
      });
    }
    const check = await url.findOne({ shortId });

    if (check) {
      return res.status(409).json({
        status: "failed",
        message:
          "This exact back-half already exists and cannot be duplicated.",
      });
    }

    await url.create({ shortId, originalUrl });

    res.status(200).json({
      status: "success",
      shortUrl: `localhost:3000/${shortId}`,
    });
  } catch (error) {
    res.status(501).json({
      status: "falied",
      error: error.message,
    });
  }
};

const redirectTorignal = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(501).json({
      status: "failed",
      error: error.message,
    });
  }
};

app.route("/shortUrl").post(shortUrl);
// app.route("/customUrl").post(customUrl);
app.route("/:id").get(redirectTorignal);

module.exports = app;
