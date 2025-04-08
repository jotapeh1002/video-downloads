import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { publicRoutes } from "../../api/routes";
import { ErrorMiddleware } from "../../api/middleware";

export const serverApp = express();

serverApp.use(
  cors({
    origin: ["http://192.168.0.2:5173","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "User-Agent"],
    credentials: true,
  })
);

serverApp.use(express.urlencoded({ extended: true }));

serverApp.use(cookieParser());

serverApp.use(express.json());

serverApp.use(publicRoutes);

serverApp.use(ErrorMiddleware);
