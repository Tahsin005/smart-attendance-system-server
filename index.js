import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db, initDb } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initDb();

app.get("/health", (req, res) => {
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
});

app.get("/", (req, res) => {
    res.send("Smart Attendance System API is running. Check /health for status.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});
