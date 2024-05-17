import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import jobRouter from "./src/features/jobs/job.routes.js";
import likeRouter from "./src/features/like/like.routes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/codingninjas/api/user", userRouter);
app.use("/codingninjas/api/job", jobRouter);
app.use("/codingninjas/api/likes", likeRouter);

app.use(appLevelErrorHandlerMiddleware);

export default app;
