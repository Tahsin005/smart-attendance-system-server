import { db } from "../config/db.config.js";

export const getHealth = (req, res) => {
    const healthcheck = {
        status: "OK",
        uptime: process.uptime(),
        message: "Server is running smoothly",
        timestamp: new Date().toISOString(),
        database: {
            status: "disconnected",
            latency: 0
        }
    };

    try {
        const start = performance.now();
        db.query("SELECT 1").get();
        const end = performance.now();

        healthcheck.database.status = "connected";
        healthcheck.database.latency = `${(end - start).toFixed(2)}ms`;

        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.status = "ERROR";
        healthcheck.database.status = "error";
        healthcheck.database.error = error.message;
        res.status(503).json(healthcheck);
    }
};
