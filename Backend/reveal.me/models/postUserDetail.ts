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
    enum: ['male', 'female', 'diverse'],
  },
  gender_interest: {
    type: String,
    enum: ['male', 'female', 'diverse'],
  },
  age: {
    type: Number,
    required: true
  },
  profile_picture: {
    type: String,
  },
  dob_date: {
    type: Number,
    required: true
  },
  dob_month: {
    type: Number,
    required: true
  },
  dob_year: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  interest: [{
    type: String,
    required: true
  }],
  language: [{
    type: String,
    required: true
  }],
  matches_contact: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }]
});

var UserDetail = mongoose.model("userDetail", profileSchema);
export default UserDetail;