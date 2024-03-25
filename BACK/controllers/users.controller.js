const { User } = require("../models/user.model");

class UserController {

    async getUsers (req, res) {
        try {
            const loggedUserid = req.user._id
            const users = await User.find({_id: {$ne: loggedUserid}})
                .select("-password")
            return res.status(200).json({users})
        } catch (error) {
            return res.status(500).json({
                error: "getUsers Controller Fail: " + error
            })
        }
    }
}

module.exports = UserController