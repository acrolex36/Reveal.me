import mongoose from "mongoose";

//model Conversation
const messageSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date(),
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  messages: [
    {
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
      },
    },
  ],
});

var Messages = mongoose.model("messageHistory", messageSchema);
export default Messages;
