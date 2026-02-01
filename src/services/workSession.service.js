import { WorkSessionRepository } from "../repositories/workSession.repository.js";
import { uploadToCloudinary } from "../config/cloudinary.config.js";

const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
};

export const WorkSessionService = {
    getTodaySession: (userId) => {
        const today = getTodayDate();
        let session = WorkSessionRepository.findByUserAndDate(userId, today);

        if (!session) {
            session = WorkSessionRepository.createSession(userId, today);
        }

        return session;
    },

    startWork: async (userId, imageBuffer, lat, lng) => {
        const session = WorkSessionService.getTodaySession(userId);

        if (session.status !== "NOT_STARTED") {
            throw new Error("Work has already been started for today.");
        }

        // upload selfie to Cloudinary
        const selfieUrl = await uploadToCloudinary(imageBuffer);

        // update session with start data
        const updatedSession = WorkSessionRepository.updateStartSession(session.id, {
            startTime: new Date().toISOString(),
            startLat: lat,
            startLng: lng,
            startSelfieUrl: selfieUrl,
        });

        return updatedSession;
    },

    endWork: async (userId, imageBuffer, lat, lng) => {
        const session = WorkSessionService.getTodaySession(userId);

        if (session.status === "NOT_STARTED") {
            throw new Error("Work has not been started yet.");
        }

        if (session.status === "COMPLETED") {
            throw new Error("Work has already been completed for today.");
        }

        // upload selfie to Cloudinary
        const selfieUrl = await uploadToCloudinary(imageBuffer);

        // update session with end data
        const updatedSession = WorkSessionRepository.updateEndSession(session.id, {
            endTime: new Date().toISOString(),
            endLat: lat,
            endLng: lng,
            endSelfieUrl: selfieUrl,
        });

        return updatedSession;
    },
};
