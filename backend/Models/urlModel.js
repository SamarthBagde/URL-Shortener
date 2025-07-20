import mongoose from "mongoose";
import validator from "validator";

const urlSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  shortId: {
    type: String,
    require: [true, "short id is not there."],
    allowNull: false,
    unique: true,
  },

  destinationUrl: {
    type: String,
    require: [true, "original URL is missing."],
    allowNull: false,
    validate: [validator.isURL, "Please enter a valid URL"],
  },
});

const url = mongoose.model("url", urlSchema);

export default url;
