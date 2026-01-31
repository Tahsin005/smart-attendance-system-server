import express from "express";
import { AuthHandler } from "../handlers/auth.handler.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", AuthHandler.login);
router.post("/register", authMiddleware, roleMiddleware("ADMIN"), AuthHandler.register);

export default router;
