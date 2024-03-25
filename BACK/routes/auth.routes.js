const express = require("express")
const { userSignUpMiddleware } = require("../middlewares/user.middleware")
const { userLoginMiddleware } = require("../middlewares/userlogin.middleware")
const router = express.Router()
const AuthController = require("../controllers/auth.controller")
const authController = new AuthController()

router.post("/signup",userSignUpMiddleware,authController.signup)
router.post("/login",userLoginMiddleware,authController.login)
router.post("/logout",authController.logout)

module.exports = router

