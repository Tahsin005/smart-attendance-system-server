import { SystemRepository } from "../repositories/system.repository.js";

export const HealthService = {
    checkHealth: async () => {
        try {
            SystemRepository.updateLastCheck();
            return {
                status: "UP",
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            throw new Error(`Health check failed: ${error.message}`);
        }
    }
};
