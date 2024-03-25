const MessageDto = require("../dtos/message.dto");


const messageValidation = async (req, res, next) => {
    const user = req.user;
    const { message } = req.body
    const { id: receiverId } = req.params
    try {

        const messageDto = await MessageDto.validateMessageDto(
            user._id,
            receiverId,
            message
        )

        if (messageDto[0]!==null) return res.status(400).json({
            error:messageDto[0]
        })
    
        req.messageDto = messageDto[1];

        next()

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" + error })
    }
}

module.exports = messageValidation