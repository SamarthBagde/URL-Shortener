import express from "express";
import cors from "cors";
import urlRouter from "./Routes/urlRoute.js";
import userRouter from "./Routes/userRoute.js";
import { errorHandler } from "./Middlewares/errorHandler.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.use(errorHandler);

export default app;
