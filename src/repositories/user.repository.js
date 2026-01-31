import { db } from "../config/db.config.js";

export const UserRepository = {
    findByEmail: (email) => {
        return db.query("SELECT * FROM users WHERE email = ?").get(email);
    },

    create: (email, password, role) => {
        return db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, password, role]);
    }
};
