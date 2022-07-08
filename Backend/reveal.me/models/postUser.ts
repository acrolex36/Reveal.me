import mongoose from "mongoose";

export enum GenderTypes {
  MALE = "male",
  FEMALE = "female",
  DIVERSE = "diverse",
}

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
    unique: true,
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
  oneSideMatch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  swipedLeftUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  userDetail: {
    is_online: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: GenderTypes,
    },
    gender_interest: [
      {
        type: String,
        enum: GenderTypes,
      },
    ],
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
    occupation: {
      type: String,
    },
    hobbies: [
      {
        type: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
  },
});

var User = mongoose.model("user", userSchema);

export default User;
