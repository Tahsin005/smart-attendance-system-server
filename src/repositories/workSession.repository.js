import { db } from "../config/db.config.js";

export const WorkSessionRepository = {
    findByUserAndDate: (userId, date) => {
        return db.query(
            "SELECT * FROM work_sessions WHERE user_id = ? AND work_date = ?"
        ).get(userId, date);
    },

    createSession: (userId, date) => {
        db.run(
            "INSERT INTO work_sessions (user_id, work_date, status) VALUES (?, ?, 'NOT_STARTED')",
            [userId, date]
        );
        return WorkSessionRepository.findByUserAndDate(userId, date);
    },

    updateStartSession: (id, { startTime, startLat, startLng, startSelfieUrl }) => {
        db.run(
            `UPDATE work_sessions 
             SET status = 'WORKING', 
                 start_time = ?, 
                 start_lat = ?, 
                 start_lng = ?, 
                 start_selfie_url = ? 
             WHERE id = ?`,
            [startTime, startLat, startLng, startSelfieUrl, id]
        );
        return db.query("SELECT * FROM work_sessions WHERE id = ?").get(id);
    },

    updateEndSession: (id, { endTime, endLat, endLng, endSelfieUrl }) => {
        db.run(
            `UPDATE work_sessions 
             SET status = 'COMPLETED', 
                 end_time = ?, 
                 end_lat = ?, 
                 end_lng = ?, 
                 end_selfie_url = ? 
             WHERE id = ?`,
            [endTime, endLat, endLng, endSelfieUrl, id]
        );
        return db.query("SELECT * FROM work_sessions WHERE id = ?").get(id);
    },
};
