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
        console.log("Database initialized successfully");

        const adminEmail = "admin@example.com";
        const adminExists = db.query("SELECT * FROM users WHERE email = ?").get(adminEmail);

        if (!adminExists) {
            const hashedPassword = await Bun.password.hash("admin123");
            db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [adminEmail, hashedPassword, "ADMIN"]);
            console.log("Admin user seeded: admin@example.com / admin123");
        }
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};

export { db, initDb };
