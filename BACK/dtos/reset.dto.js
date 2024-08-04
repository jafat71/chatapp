const { User } = require("../models/user.model")
const bcryptjs = require("bcryptjs")
const { securePassword } = require("../services/passwordHash")

class ResetDto {

    username = ""
    password = ""
    newPassword = ""
    confirmNewPassword = ""
    constructor(
        username,
        password,
        newPassword,
        confirmNewPassword
    ) {
        this.username = username
        this.password = password
        this.newPassword = newPassword
        this.confirmNewPassword = confirmNewPassword 
    }

    static async validateResetDto(
        username,
        password,
        newPassword,
        confirmNewPassword
    ) {

        if (
            !username || 
            !password ||
            !newPassword ||
            !confirmNewPassword
            ) {
            return ["Missing fields", null]
        }

        const user = await User.findOne({ username })
        
        const passwordValidation = await bcryptjs.compare(password, user?.password || "")
        if(!passwordValidation || !user){
            return ["User/Password incorrect", null]        
        }

        if (newPassword !== confirmNewPassword) return ["New Passwords do not match", null]

        return [null, new ResetDto(
            username,
            password,
            newPassword,
            confirmNewPassword
        )]
    }
}

module.exports = ResetDto;