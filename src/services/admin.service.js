import { UserRepository } from "../repositories/user.repository.js";
import { WorkSessionRepository } from "../repositories/workSession.repository.js";

export const AdminService = {
    listEmployees: (searchEmail) => {
        return UserRepository.findAllEmployees(searchEmail);
    },

    listUserWorkSessions: (userId, startDate, endDate) => {
        return WorkSessionRepository.findSessionsByUserId(userId, startDate, endDate);
    }
};
