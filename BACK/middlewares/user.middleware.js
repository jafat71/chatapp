const express = require("express");
const UserDto = require("../dtos/user.dto");

const userSignUpMiddleware = async (req,res,next) => {
    const {
        fullname,
        username,
        password,
        confirmPassword,
        gender
    } = req.body;


    const userDto = await UserDto.validateUserDto(
        fullname,
        username,
        password,
        confirmPassword,
        gender
    )

    if (userDto[0]!==null) return res.status(400).json({
        error:userDto[0]
    })

    req.userDto = userDto[1];

    next()
}

module.exports = {
    userSignUpMiddleware
}