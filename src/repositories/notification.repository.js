import { db } from "../config/db.config.js";

export const NotificationRepository = {
    saveToken: (userId, token) => {
        // Use INSERT OR IGNORE to avoid duplicates for the same user/token pair
        db.run(
            "INSERT OR IGNORE INTO push_tokens (user_id, expo_push_token) VALUES (?, ?)",
            [userId, token]
        );
    },

    getTokensByUserId: (userId) => {
        return db.query("SELECT expo_push_token FROM push_tokens WHERE user_id = ?").all(userId);
    },

    getAllTokens: () => {
        return db.query("SELECT expo_push_token FROM push_tokens").all();
    },

    deleteToken: (userId, token) => {
        db.run(
            "DELETE FROM push_tokens WHERE user_id = ? AND expo_push_token = ?",
            [userId, token]
        );
    }
};
