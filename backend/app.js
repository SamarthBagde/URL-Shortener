const express = require("express");
const url = require("./models/url");

const app = express();

app.use(express.json());

const shortUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;

    const { customAlphabet } = await import("nanoid"); // dynamic import
    const nanoid = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      6
    );
    const shortId = nanoid();

    await url.create({ shortId, originalUrl });

    res.status(200).json({
      status: "success",
      shortUrl: `localhost:3001/${shortId}`,
    });
  } catch (error) {
    res.status(501).json({
      status: "falied",
      error: error,
    });
  }
};

const customUrl = async (req, res) => {
  try {
    const shortId = req.body.id;
    const originalUrl = req.body.url;

    const check = await url.findOne({ shortId });
    if (!check) {
      await url.create({ shortId, originalUrl });

      res.status(200).json({
        status: "success",
        shortUrl: `localhost:3001/${shortId}`,
      });
    } else {
      res.status(409).json({
        status: "Conflict ",
        shortUrl: `${shortId} already used.`,
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "falied",
      error: error,
    });
  }
};

const redirectTorignal = async (req, res) => {
  try {
    const shortId = req.params.id;
    const data = await url.findOne({ shortId });
    const originalUrl = data.originalUrl;

    res.redirect(originalUrl);
  } catch (error) {
    res.status(501).json({
      status: "falied",
      error: error,
    });
  }
};

app.route("/shortUrl").post(shortUrl);
app.route("/customUrl").post(customUrl);
app.route("/:id").get(redirectTorignal);

module.exports = app;
