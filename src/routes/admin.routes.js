import express from "express";
import { AdminHandler } from "../handlers/admin.handler.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

router.get("/employees", AdminHandler.listEmployees);
router.get("/work-sessions", AdminHandler.listUserWorkSessions);

export default router;
