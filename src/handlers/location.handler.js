import { LocationService } from "../services/location.service.js";
import { ApiResponse } from "../utils/response.util.js";

export const LocationHandler = {
    postLocation: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { lat, lng } = req.body;

            if (lat === undefined || lng === undefined) {
                return ApiResponse.error(res, "Latitude and longitude are required", null, 400);
            }

            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);

            if (isNaN(latitude) || isNaN(longitude)) {
                return ApiResponse.error(res, "Invalid latitude or longitude values", null, 400);
            }

            const result = await LocationService.updateLocation(userId, latitude, longitude);

            return ApiResponse.success(res, "Location updated successfully", result);
        } catch (error) {
            const statusCode = error.message.includes("Attendance") ? 400 : 500;
            return ApiResponse.error(res, error.message, error, statusCode);
        }
    }
};
