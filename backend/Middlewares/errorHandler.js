import { AppError } from "../Utils/appError.js";

const sendError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("error handler  : ");
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message);
  const message = `Invalid input data. ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `This exact link already exists and cannot be duplicated`;
  return new AppError(message, 400);
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = err;

  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
  }

  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
  }

  if (err.code === 11000) {
    error = handleDuplicateFieldsDB(err);
  }

  sendError(error, res);
};
