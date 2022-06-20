import mongoose from "mongoose";

//model Conversation
const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  total_messages: {
    type: Number,
    default: 0,
  },
});

var Messages = mongoose.model("messageHistory", messageSchema);
export default Messages;
