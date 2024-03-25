const ConversationDto = require("../dtos/conversation.dto");

const getConversationValidation = async (req, res, next) => {
    const user = req.user;
    const { id: receiverId } = req.params
    try {

        const conversationDto = await ConversationDto.validateConversationDto(
            user._id,
            receiverId
        )

        if (conversationDto[0]!==null) return res.status(400).json({
            error:conversationDto[0]
        })
    
        req.conversationDto = conversationDto[1];

        next()

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" + error })
    }
}
module.exports = getConversationValidation 