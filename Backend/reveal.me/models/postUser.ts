import mongoose from "mongoose";

//model User
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: new Date(),
  },
  lastPasswordReset: {
    type: Date,
    default: new Date(),
  },
  userDetail: {
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
    },
    profile_picture: {
      type: String,
    },
    dob_date: {
      type: Number,
    },
    dob_month: {
      type: Number,
    },
    dob_year: {
      type: Number,
    },
    height: {
      type: Number,
    },
    nationality: {
      type: String,
    },
    education: {
      type: String,
    },
    interest: [{
      type: String,
    }],
    language: [{
      type: String,
    }],
    matches_contact: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user' 
    }]
  }
});

var User = mongoose.model("user", userSchema);


export default User;

