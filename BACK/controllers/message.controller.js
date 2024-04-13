const { Conversation } = require("../models/conversation.model");
const { Message } = require("../models/message.model");
const { io,getReceiverSocketId } = require("../sockets/socket");


class MessageController {

    async sendMessage(req, res) {
        const messageDto = req.messageDto;
        try {

            let conversation = await Conversation.findOne({
                participants: {$all: [messageDto.senderId, messageDto.receiverId]}
            })

            if(!conversation) {
                conversation = await Conversation.create({
                    participants: [messageDto.senderId, messageDto.receiverId]
                })  
            }

            const newMessage = new Message({
                ...messageDto
            })
            if(newMessage){
                conversation.messages.push(newMessage._id)
            }

            await Promise.all([newMessage.save(),conversation.save()])

            const receiverSocketId = getReceiverSocketId(messageDto.receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage)
            }

            return res.status(201).json(newMessage)

        } catch (error) {
            return res.status(500).json({
                error: "SendMessage Controller Fail: " + error
            })
        }

    }

    async getMessages (req, res) {
        const conversationDto = req.conversationDto;
        try {
            const conversation = await Conversation.findById(conversationDto.id)
                .populate("messages")
            //conversationDto.messages = conversation.messages
            return res.status(200).json({messages: conversation.messages})
        } catch (error) {
            return res.status(500).json({
                error: "getMessages Controller Fail: " + error
            })
        }
    }
}

module.exports = MessageController