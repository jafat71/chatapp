const { User } = require("../models/user.model")
const bcryptjs = require("bcryptjs")

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

        const user = await User.findOne({ username })
        
        const passwordValidation = await bcryptjs.compare(password, user?.password || "")
        if(!passwordValidation || !user){
            return ["User/Password incorrect", null]        
        }

        return [null, new UserLoginDto(
            username,
            password,
        )]
    }
}

module.exports = UserLoginDto;