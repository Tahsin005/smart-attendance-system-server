import { db } from "../config/db.config.js";

export const UserRepository = {
    findAllEmployees: (searchEmail) => {
        let query = "SELECT id, email, role, created_at FROM users WHERE role = 'EMPLOYEE'";
        const params = [];

        if (searchEmail) {
            query += " AND email LIKE ?";
            params.push(`%${searchEmail}%`);
        }

        return db.query(query).all(...params);
    },

    findByEmail: (email) => {
        return db.query("SELECT * FROM users WHERE email = ?").get(email);
    },

    create: (email, password, role) => {
        db.run(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, password, role]
        );
    }
};
