import express from "express";
import { WorkSessionHandler } from "../handlers/workSession.handler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { uploadSingleImage } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/today", authMiddleware, WorkSessionHandler.getTodaySession);

router.post("/start", authMiddleware, uploadSingleImage, WorkSessionHandler.startWork);

router.post("/end", authMiddleware, uploadSingleImage, WorkSessionHandler.endWork);

export default router;
