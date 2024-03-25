const jwt = require("jsonwebtoken")

const genToken = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })

    res.cookie("jwt",token,{
        maxAge: 1000 * 60 * 24,
        httpOnly: true, //prevent XSS attack
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

module.exports = genToken
