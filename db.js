import { Database } from "bun:sqlite";

const db = new Database("attendance.sqlite");

const initDb = () => {
    try {
        db.run(`
            CREATE TABLE IF NOT EXISTS system_status (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                last_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};

export { db, initDb };
