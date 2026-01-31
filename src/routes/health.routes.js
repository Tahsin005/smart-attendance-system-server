import express from "express";
import { HealthHandler } from "../handlers/health.handler.js";

const router = express.Router();

router.get("/", HealthHandler.check);

export default router;
