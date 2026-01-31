import { db } from "../config/db.config.js";

export const SystemRepository = {
    updateLastCheck: () => {
        return db.run("INSERT INTO system_status (last_check) VALUES (CURRENT_TIMESTAMP)");
    }
};
