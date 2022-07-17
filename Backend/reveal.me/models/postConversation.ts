import mongoose from "mongoose";

//model Conversation
const conversationSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date(),
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ]
});

var Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
