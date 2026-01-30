import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", authMiddleware, roleMiddleware("ADMIN"), register);

export default router;
