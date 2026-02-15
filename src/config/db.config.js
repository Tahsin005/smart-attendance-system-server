import { Database } from "bun:sqlite";

const db = new Database("attendance.sqlite");

const initDb = async () => {
    try {
        db.run(`
            CREATE TABLE IF NOT EXISTS system_status (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                last_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT,
                role TEXT CHECK(role IN ('ADMIN', 'EMPLOYEE')) DEFAULT 'EMPLOYEE',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS work_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                work_date DATE NOT NULL,
                status TEXT CHECK (status IN ('NOT_STARTED', 'WORKING', 'COMPLETED')) DEFAULT 'NOT_STARTED',
                start_time DATETIME,
                start_lat REAL,
                start_lng REAL,
                start_selfie_url TEXT,
                end_time DATETIME,
                end_lat REAL,
                end_lng REAL,
                end_selfie_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, work_date),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS location_live (
                work_session_id INTEGER PRIMARY KEY,

                lat REAL NOT NULL,
                lng REAL NOT NULL,
                recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (work_session_id)
                    REFERENCES work_sessions(id)
                    ON DELETE CASCADE
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS location_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                work_session_id INTEGER NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (work_session_id)
                    REFERENCES work_sessions(id)
                    ON DELETE CASCADE
            )
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS push_tokens (
                user_id INTEGER NOT NULL,
                expo_push_token TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, expo_push_token),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log("Database initialized successfully");

        const adminEmail = "admin@gmail.com";
        const adminExists = db.query("SELECT * FROM users WHERE email = ?").get(adminEmail);

        if (!adminExists) {
            const hashedPassword = await Bun.password.hash("admin123");
            db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [adminEmail, hashedPassword, "ADMIN"]);
            console.log("Admin user seeded: admin@gmail.com / admin123");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};

export { db, initDb };
