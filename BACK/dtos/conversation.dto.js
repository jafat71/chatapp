const { Conversation } = require("../models/conversation.model")

class ConversationDto {

    participants = []
    messages = []

    constructor(
        id,
        participants
    ) {
        this.id = id
        this.participants = participants
    }

    set messages(messages) {
        this.messages = messages
    }

    static async validateConversationDto(
        senderId,
        receiverId
    ) {
        if (!receiverId) {
            return ["Missing receiverId", null]
        }

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        if (!conversation) return ["Conversation between users does not exists.", null]

        return [null, new ConversationDto(
            conversation._id,
            [senderId, receiverId]
        )]
    }
}

module.exports = ConversationDto;