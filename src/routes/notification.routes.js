import express from "express";
import { NotificationHandler } from "../handlers/notification.handler.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`[NotificationRoute] Incoming ${req.method} ${req.path}`);
    next();
});


// Register a device token for the current user
router.post("/register", authMiddleware, NotificationHandler.register);

// Send a test notification (Admin only or for testing)
router.post("/send", authMiddleware, roleMiddleware("ADMIN"), NotificationHandler.sendTestNotification);

export default router;
