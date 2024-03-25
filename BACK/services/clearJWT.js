const jwt = require("jsonwebtoken")

const clearToken = (res)=>{

    res.cookie("jwt","",{
        maxAge: 0
    })
}

module.exports = clearToken
