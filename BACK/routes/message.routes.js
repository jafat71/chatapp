const express = require("express")
const router = express.Router()
const verifySender = require("../middlewares/verifySender.middleware")
const messageValidation = require("../middlewares/message.middleware")
const getConversationValidation = require("../middlewares/getConversationValidation.middleware")
const MessageControllerController = require("../controllers/message.controller")
const messageController = new MessageControllerController()

router.get("/:id",[verifySender,getConversationValidation],messageController.getMessages)
router.post("/send/:id",[verifySender,messageValidation],messageController.sendMessage)

module.exports = router
