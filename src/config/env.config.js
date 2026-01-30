import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    databaseUrl: process.env.DATABASE_URL || "attendance.sqlite",
    jwtSecret: process.env.JWT_SECRET || "default-secret-key",
};

export default config;
