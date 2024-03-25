const express = require("express");
const UserLoginDto = require("../dtos/userlogin.dto");

const userLoginMiddleware = async (req,res,next) => {
    const {
        username,
        password,
    } = req.body;

    const userLoginDto = await UserLoginDto.validateUserLoginDto(
        username,
        password,
    )

    if (userLoginDto[0]!==null) return res.status(400).json({
        error:userLoginDto[0]
    })

    req.userLoginDto = userLoginDto[1];

    next()
}

module.exports = {
    userLoginMiddleware
}