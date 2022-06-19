import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  is_online: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'diver'],
  },
  age: {
    type: Number,
    required: true
  },
  profile_picture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  matches_contact: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }]
});

var UserDetail = mongoose.model("userDetail", profileSchema);
export default UserDetail;