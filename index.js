import express from "express";
import cors from "cors";
import config from "./src/config/env.config.js";
import { initDb } from "./src/config/db.config.js";
import routes from "./src/routes/index.routes.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Modular Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Smart Attendance System API is running. Check /api/health for status.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
