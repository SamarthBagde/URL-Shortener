const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    require: [true, "short id is not there."],
    allowNull: false,
    unique: true,
  },

  originalUrl: {
    type: String,
    require: [true, "original URL is missing."],
    allowNull: false,
  },
});

const url = mongoose.model("url", urlSchema);

module.exports = url;
