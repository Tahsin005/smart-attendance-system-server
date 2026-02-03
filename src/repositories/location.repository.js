import { db } from "../config/db.config.js";

export const LocationRepository = {
    upsertLiveLocation: (workSessionId, lat, lng) => {
        db.run(
            `INSERT INTO location_live (work_session_id, lat, lng, recorded_at)
             VALUES (?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(work_session_id) DO UPDATE SET
                lat = excluded.lat,
                lng = excluded.lng,
                recorded_at = excluded.recorded_at`,
            [workSessionId, lat, lng]
        );
    },

    getLastLoggedLocation: (workSessionId) => {
        return db.query(
            "SELECT * FROM location_logs WHERE work_session_id = ? ORDER BY recorded_at DESC LIMIT 1"
        ).get(workSessionId);
    },

    insertLogLocation: (workSessionId, lat, lng) => {
        db.run(
            "INSERT INTO location_logs (work_session_id, lat, lng, recorded_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
            [workSessionId, lat, lng]
        );
    }
};
