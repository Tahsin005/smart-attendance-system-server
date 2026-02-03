import { WorkSessionService } from "../services/workSession.service.js";
import { ApiResponse } from "../utils/response.util.js";

export const WorkSessionHandler = {
    getTodaySession: (req, res) => {
        try {
            const userId = req.user.userId;
            const session = WorkSessionService.getTodaySession(userId);
            return ApiResponse.success(res, "Today's work session retrieved", session);
        } catch (error) {
            return ApiResponse.error(res, "Failed to get work session", error, 500);
        }
    },

    startWork: async (req, res) => {
        try {
            const userId = req.user.userId;

            // validate image
            if (!req.file) {
                return ApiResponse.error(res, "Selfie image is required", null, 400);
            }

            // validate coordinates
            const { lat, lng } = req.body;
            if (!lat || !lng) {
                return ApiResponse.error(res, "Latitude and longitude are required", null, 400);
            }

            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);

            if (isNaN(latitude) || isNaN(longitude)) {
                return ApiResponse.error(res, "Invalid latitude or longitude values", null, 400);
            }

            const session = await WorkSessionService.startWork(
                userId,
                req.file.buffer,
                latitude,
                longitude
            );

            return ApiResponse.success(res, "Work started successfully", session);
        } catch (error) {
            const statusCode = error.message.includes("already") ? 400 : 500;
            return ApiResponse.error(res, error.message, error, statusCode);
        }
    },

    endWork: async (req, res) => {
        try {
            const userId = req.user.userId;

            // validate image
            if (!req.file) {
                return ApiResponse.error(res, "Selfie image is required", null, 400);
            }

            // validate coordinates
            const { lat, lng } = req.body;
            if (!lat || !lng) {
                return ApiResponse.error(res, "Latitude and longitude are required", null, 400);
            }

            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);

            if (isNaN(latitude) || isNaN(longitude)) {
                return ApiResponse.error(res, "Invalid latitude or longitude values", null, 400);
            }

            const session = await WorkSessionService.endWork(
                userId,
                req.file.buffer,
                latitude,
                longitude
            );

            return ApiResponse.success(res, "Work ended successfully", session);
        } catch (error) {
            const statusCode = error.message.includes("not been started") ||
                error.message.includes("already") ? 400 : 500;
            return ApiResponse.error(res, error.message, error, statusCode);
        }
    },

    getDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const details = WorkSessionService.getDetails(id);
            return ApiResponse.success(res, "Work session details retrieved successfully", details);
        } catch (error) {
            const statusCode = error.message.includes("not found") ? 404 : 500;
            return ApiResponse.error(res, error.message, error, statusCode);
        }
    }
};
