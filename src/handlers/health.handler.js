import { HealthService } from "../services/health.service.js";
import { ApiResponse } from "../utils/response.util.js";

export const HealthHandler = {
    check: async (req, res) => {
        try {
            const result = await HealthService.checkHealth();
            return ApiResponse.success(res, "Health check successful", result);
        } catch (error) {
            return ApiResponse.error(res, "Health check failed", error);
        }
    }
};
