import { AdminService } from "../services/admin.service.js";
import { ApiResponse } from "../utils/response.util.js";

export const AdminHandler = {
    listEmployees: async (req, res) => {
        try {
            const { email } = req.query;
            const employees = AdminService.listEmployees(email);
            return ApiResponse.success(res, "Employees retrieved successfully", employees);
        } catch (error) {
            return ApiResponse.error(res, "Failed to retrieve employees", error, 500);
        }
    },

    listUserWorkSessions: async (req, res) => {
        try {
            const { userId, startDate, endDate } = req.query;

            if (!userId) {
                return ApiResponse.error(res, "User ID is required", null, 400);
            }

            const sessions = AdminService.listUserWorkSessions(userId, startDate, endDate);
            return ApiResponse.success(res, "Work sessions retrieved successfully", sessions);
        } catch (error) {
            return ApiResponse.error(res, "Failed to retrieve work sessions", error, 500);
        }
    }
};
