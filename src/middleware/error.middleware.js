import { ApiResponse } from "../utils/response.util.js";

export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return ApiResponse.error(res, message, err, statusCode);
};
