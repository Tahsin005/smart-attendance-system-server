import express from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import workSessionRoutes from "./workSession.routes.js";
import locationRoutes from "./location.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/work-session", workSessionRoutes);
router.use("/location", locationRoutes);

export default router;
