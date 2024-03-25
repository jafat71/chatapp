const { User } = require("../models/user.model")

class MessageDto {

    constructor(
        senderId,
        receiverId,
        message
    ) {
        this.senderId = senderId
        this.receiverId = receiverId
        this.message = message 
    }

    static async validateMessageDto(
        senderId,
        receiverId,
        message
    ) {
        if (!receiverId ) {
            return ["Missing receiverId", null]
        }

        if (message.length === 0) return res.status(400).json({
            error: "Message cannot be empty"
        })

        const user = await User.findById(receiverId)
        if (!user) return ["Destination User does not Exists", null]
        
        return [null, new MessageDto(
            senderId,
            user._id,
            message
        )]
    }
}

module.exports = MessageDto;