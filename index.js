import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./src/config/db.config.js";
import routes from "./src/routes/index.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Modular Routes
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Smart Attendance System API is running. Check /api/health for status.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
