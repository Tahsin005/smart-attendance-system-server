import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import { UserRepository } from "../repositories/user.repository.js";

export const AuthService = {
    login: async (email, password) => {
        const user = UserRepository.findByEmail(email);

        if (!user || !(await Bun.password.verify(password, user.password))) {
            throw new Error("Invalid email or password.");
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            config.jwtSecret,
            { expiresIn: "30d" }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
    },

    register: async (email, password, role) => {
        const hashedPassword = await Bun.password.hash(password);
        try {
            UserRepository.create(email, hashedPassword, role);
        } catch (error) {
            if (error.message.includes("UNIQUE constraint failed")) {
                throw new Error("User already exists with this email.");
            }
            throw error;
        }
    }
};
