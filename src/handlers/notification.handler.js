import { NotificationRepository } from "../repositories/notification.repository.js";

export const NotificationHandler = {
    register: async (req, res) => {
        try {
            const { expoPushToken } = req.body;
            const userId = req.user.userId; // Use userId from JWT payload

            console.log(`[NotificationHandler] Registering token for user ${userId}: ${expoPushToken}`);

            if (!expoPushToken) {
                console.error("[NotificationHandler] Registration failed: Missing expoPushToken");
                return res.status(400).json({ error: "Push token is required" });
            }

            if (!userId) {
                console.error("[NotificationHandler] Registration failed: No userId in request user object", req.user);
                return res.status(401).json({ error: "Invalid user session" });
            }

            NotificationRepository.saveToken(userId, expoPushToken);
            console.log("[NotificationHandler] Token saved successfully for user", userId);
            res.status(200).json({ message: "Device registered successfully" });
        } catch (error) {
            console.error("[NotificationHandler] Registration error:", error);
            res.status(500).json({ error: "Failed to register device" });
        }
    },

    sendTestNotification: async (req, res) => {
        try {
            const { title, body, userId } = req.body;

            // If userId is provided, send to that user, otherwise send to all (for testing)
            let tokens = [];
            if (userId) {
                const userTokens = NotificationRepository.getTokensByUserId(userId);
                tokens = userTokens.map(t => t.expo_push_token);
            } else {
                const allTokens = NotificationRepository.getAllTokens();
                tokens = allTokens.map(t => t.expo_push_token);
            }

            if (tokens.length === 0) {
                return res.status(404).json({ error: "No tokens found" });
            }

            const messages = tokens.map(token => ({
                to: token,
                sound: 'default',
                title: title || 'Test Notification',
                body: body || 'This is a test notification from the server!',
                data: { withSome: 'data' },
            }));

            // Send to Expo API
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages),
            });

            const data = await response.json();
            res.status(200).json({ message: "Notification sent", data });
        } catch (error) {
            console.error("Notification sending error:", error);
            res.status(500).json({ error: "Failed to send notification" });
        }
    }
};
