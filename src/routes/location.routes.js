import express from "express";
import { LocationHandler } from "../handlers/location.handler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, LocationHandler.postLocation);

export default router;
