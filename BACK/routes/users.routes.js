const express = require("express")
const verifySender = require("../middlewares/verifySender.middleware")
const router = express.Router()
const UserController = require("../controllers/users.controller")
const userController = new UserController()

router.get("/",verifySender,userController.getUsers)

module.exports = router