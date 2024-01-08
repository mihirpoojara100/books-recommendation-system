const UserSchema = require('../Database/Schemas').users;
const UserSessions = require('../Database/Schemas').user_sessions;
const { compareSync } = require('bcrypt');

class AuthModel {
    async getUser(payload) {
        return UserSchema.findOne({
            where: { ...payload, deletedAt: null },
            raw: true,
        });
    }

    async createUser(payload) {
        return UserSchema.create(payload);
    }

    comparePassword(password_entered, password_in_db) {
        return compareSync(password_entered, password_in_db);
    }

    async createUserToken(userId, authToken) {
        return UserSessions.create({
            userId,
            authToken,
            s,
        });
    }
}

module.exports = AuthModel;
