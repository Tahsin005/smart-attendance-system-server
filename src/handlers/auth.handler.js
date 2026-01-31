import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/response.util.js";

export const AuthHandler = {
    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return ApiResponse.error(res, "Email and password are required.", null, 400);
        }

        try {
            const result = await AuthService.login(email, password);
            return ApiResponse.success(res, "Login successful", result);
        } catch (error) {
            return ApiResponse.error(res, "Login failed", error, 401);
        }
    },

    register: async (req, res) => {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return ApiResponse.error(res, "Email, password, and role are required.", null, 400);
        }

        try {
            await AuthService.register(email, password, role);
            return ApiResponse.success(res, "User registered successfully", {}, 201);
        } catch (error) {
            const statusCode = error.message.includes("exists") ? 400 : 500;
            return ApiResponse.error(res, "Registration failed", error, statusCode);
        }
    }
};
