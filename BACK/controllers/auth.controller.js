const { User } = require("../models/user.model");
const clearToken = require("../services/clearJWT");
const genToken = require("../services/generateJWT");

class AuthController {

    async login(req, res) {
        const userLoginDto = req.userLoginDto;
        try {
            const userLogged = await User.findOne({ username: userLoginDto.username });
            genToken(userLogged._id, res)

            return res.json({
                userLogged: {
                    _id:       userLogged._id,
                    fullname:   userLogged.fullname,
                    username:   userLogged.username,
                    gender:     userLogged.gender,
                    profilePic: userLogged.profilePic
                }
            })
        } catch (error) {
            return res.status(500).json({
                error: "Login Controller Fail: " + error
            })
        }
    }

    async signup(req, res) {
        const userDto = req.userDto;
        try {
            const newUser = new User({ ...userDto })
            const {
                fullname,
                username,
                password,
                gender,
                profilePic,
                _id } = await newUser.save();

            //GENERATE JWT    
            genToken(_id, res)

            return res.json({
                userCreated: {
                    _id,
                    fullname,
                    username,
                    password,
                    gender,
                    profilePic
                }
            })
        } catch (error) {
            return res.status(500).json({
                error: "Signup Controller Fail: " + error
            })
        }

    }

    logout(req, res) {
        try {
            clearToken(res)
            return res.status(200).json({
                meg: "logout succefully"
            })
        } catch (error) {
            return res.status(500).json({
                error: "Logout Controller Fail: " + error
            })
        }
    }
}

module.exports = AuthController  
