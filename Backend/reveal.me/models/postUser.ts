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
});

var User = mongoose.model("user", userSchema);


export default User;

