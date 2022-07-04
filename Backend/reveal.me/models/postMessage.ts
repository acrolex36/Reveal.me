import mongoose from "mongoose";

//model Conversation
const messagesSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation"
    },
    sender: {
        type: String,
    },
    message: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    has_been_seen: {
        type: Boolean,
        default: false,
    }
});

var Message = mongoose.model("messages", messagesSchema);
export default Message;