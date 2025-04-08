import { Router } from "express";
import { GetDetailsController } from "../controllers";
import { DownloadVideosController } from "../controllers/dowloadVideos";

export const publicRoutes = Router();

const getVideosController = new GetDetailsController()
const downloadsController = new DownloadVideosController()

publicRoutes.get("/getvideos",getVideosController.execute);
publicRoutes.get("/downloads",downloadsController.execute);
