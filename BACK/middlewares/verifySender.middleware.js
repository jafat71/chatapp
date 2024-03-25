
const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model")

const verifySender = async (req, res, next) => {
    try {
        //cookie-parser middleware
        const token = req.cookies.jwt 
        if(!token){
            return res.status(401).json({error:"Unathorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unathorized: invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({error:"Unathorized: User not found"})
        }

        req.user = user

        next()

    }catch(error){
        return res.status(500).json({error:"Internal Server Error"+error})
    }
}

module.exports = verifySender