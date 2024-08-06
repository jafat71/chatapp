const { User } = require("../models/user.model")
const bcryptjs = require("bcryptjs")
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; 
const logger = require("../logger/logger"); 

class UserLoginDto {

    username = ""
    password = ""

    constructor(
        username,
        password,
    ) {
        this.username = username
        this.password = password
    }

    static async validateUserLoginDto(
        username,
        password,
    ) {
        if (
            !username ||
            !password
        ) {
            return ["Missing required fields:[username,password]", null]
        }

        const user = await User.findOne({ username: username.toString() })
        if (!user) {
            logger.info(`Login attempt failed: User not found. Username: ${username}`);
            return ["User/Password incorrect", null]
        }
        
        if (user.lockoutUntil && user.lockoutUntil > Date.now()) {
            const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
            logger.info(`Login attempt failed: User locked out. Username: ${username}, Remaining Time: ${remainingTime} seconds`);
            return [`Too many attempts. Try again in ${remainingTime} seconds.`, null];
        }

        const passwordValidation = await bcryptjs.compare(password, user?.password || "")
        if (!passwordValidation || !user) {
            user.failedAttempts += 1;

            if (user.failedAttempts >= MAX_ATTEMPTS) {
                user.lockoutUntil = new Date(Date.now() + LOCKOUT_TIME);
                logger.warn(`User locked out due to too many failed login attempts. Username: ${username}`);
            } else {
                logger.warn(`Login attempt failed: Invalid password. Username: ${username}`);
            }

            await user.save();
            logger.info(`User logged in successfully. Username: ${username}`);

            return ["User/Password incorrect", null]
        }

        user.failedAttempts = 0
        user.lockoutUntil = null
        await user.save();

        return [null, new UserLoginDto(
            username,
            password,
        )]
    }
}

module.exports = UserLoginDto;