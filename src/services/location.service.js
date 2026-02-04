import { LocationRepository } from "../repositories/location.repository.js";
import { WorkSessionService } from "./workSession.service.js";
import { Formula } from "../utils/formula.util.js";

export const LocationService = {
    updateLocation: async (userId, lat, lng) => {
        // get today's work session
        const session = await WorkSessionService.getTodaySession(userId);

        // ensure status = WORKING
        if (!session || session.status !== "WORKING") {
            throw new Error("Attendance hasn't been started or is already completed.");
        }

        const workSessionId = session.id;

        // upsert location_live (always)
        LocationRepository.upsertLiveLocation(workSessionId, lat, lng);

        // get last saved location_logs entry
        const lastLog = LocationRepository.getLastLoggedLocation(workSessionId);

        let shouldLog = false;
        if (!lastLog) {
            // if no logs yet, we should log the first one
            shouldLog = true;
        } else {
            // calculate distance using haversine formula
            // ref: https://en.wikipedia.org/wiki/Haversine_formula
            const distance = Formula.haversine_formula(
                lastLog.lat,
                lastLog.lng,
                lat,
                lng
            );

            // if distance >= threshold (e.g. 2m)
            if (distance >= 0) {
                shouldLog = true;
            }
        }

        if (shouldLog) {
            // → insert into location_logs
            LocationRepository.insertLogLocation(workSessionId, lat, lng);
        }

        return {
            liveUpdated: true,
            logged: shouldLog,
            sessionId: workSessionId
        };
    }
};
