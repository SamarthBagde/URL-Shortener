import express from "express";
import cors from "cors";
import urlRouter from "./Routes/urlRoute.js";
import userRouter from "./Routes/userRoute.js";
import { errorHandler } from "./Middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOriginURL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: corsOriginURL,
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.use(errorHandler);

export default app;
