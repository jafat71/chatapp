const express = require("express");
const ResetDto = require("../dtos/reset.dto");

const resetMiddleware = async (req,res,next) => {
    const {
        username,
        password,
        newPassword,
        confirmNewPassword
    } = req.body;

    const resetDto = await ResetDto.validateResetDto(
        username,
        password,
        newPassword,
        confirmNewPassword
    )

    if (resetDto[0]!==null) return res.status(400).json({
        error:resetDto[0]
    })

    req.resetDto = resetDto[1];

    next()
}

module.exports = {
    resetMiddleware
}