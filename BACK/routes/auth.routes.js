const express = require("express")
const { userSignUpMiddleware } = require("../middlewares/user.middleware")
const { userLoginMiddleware } = require("../middlewares/userlogin.middleware")
const router = express.Router()
const AuthController = require("../controllers/auth.controller")
const { resetMiddleware } = require("../middlewares/reset.middleware")
const authController = new AuthController()

router.post("/signup",userSignUpMiddleware,authController.signup)
router.post("/login",userLoginMiddleware,authController.login)
router.post("/reset",resetMiddleware,authController.reset)

router.post("/logout",authController.logout)

module.exports = router

