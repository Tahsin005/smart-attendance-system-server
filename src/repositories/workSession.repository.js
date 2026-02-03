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

    findSessionsByUserId: (userId, startDate, endDate) => {
        let query = "SELECT * FROM work_sessions WHERE user_id = ?";
        const params = [userId];

        if (startDate) {
            query += " AND work_date >= ?";
            params.push(startDate);
        }

        if (endDate) {
            query += " AND work_date <= ?";
            params.push(endDate);
        }

        query += " ORDER BY work_date DESC";
        return db.query(query).all(...params);
    },

    getDetailsWithLocations: (sessionId) => {
        const session = db.query("SELECT * FROM work_sessions WHERE id = ?").get(sessionId);
        if (!session) return null;

        const liveLocation = db.query("SELECT * FROM location_live WHERE work_session_id = ?").get(sessionId);
        const locationLogs = db.query("SELECT * FROM location_logs WHERE work_session_id = ? ORDER BY recorded_at ASC").all(sessionId);

        return {
            ...session,
            liveLocation,
            locationLogs
        };
    }
};
