const { User } = require("../models/user.model")
const { securePassword } = require("../services/passwordHash")


class UserDto {

    fullname = ""
    username = ""
    password = ""
    confirmPassword = ""
    gender = ""
    profilePic = ""

    constructor(
        fullname,
        username,
        password,
        gender,
        profilePic
    ) {
        this.fullname = fullname
        this.username = username
        this.password = password 
        this.gender = gender
        this.profilePic = profilePic
    }

    static async validateUserDto(
        fullname,
        username,
        password,
        confirmPassword,
        gender
    ) {
        if (
            !fullname || 
            !username || 
            !password || 
            !confirmPassword || 
            !gender) {
            return ["Missing required fields:[fullname,username,password,confirmPassword,gender]", null]
        }

        if (password !== confirmPassword) return ["Passwords do not match", null]

        const user = await User.findOne({ username })
        if (user) return ["Username already exists", null]
        
        if (!(gender === "MALE" || gender === "FEMALE")) return ["Invalid genre (MALE|FEMALE)", null]
        
        const profilePic = gender === "MALE"
            ? "https://avatar.iran.liara.run/public/boy?username=" + username
            : "https://avatar.iran.liara.run/public/girl?username=" + username

        password = await securePassword(password)

        return [null, new UserDto(
            fullname,
            username,
            password,
            gender,
            profilePic
        )]
    }
}

module.exports = UserDto;