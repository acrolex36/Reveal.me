import express, { Request, response, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { GenderTypes } from "../models/postUser";
import Conversation from "../models/postConversation";
import Message from "../models/postMessage";

const router = express.Router();

const JWT_SECRET = "asdfhasdfwqber12312sa";

const checkToken = (req: Request, res: Response, next: any) => {
  var TOKEN = req.headers["x-access-token"] || req.headers["authorization"];
  TOKEN = TOKEN?.toString();

  if (TOKEN === undefined) {
    return res.status(401).send({ error: "Token is not present" });
  }

  if (TOKEN.startsWith("Bearer ")) {
    TOKEN = TOKEN.slice(7, TOKEN.length);
  }

  if (TOKEN) {
    jwt.verify(TOKEN, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          message: "Token is not right...",
        });
      } else {
        next();
      }
    });
  } else {
    return res.json({
      message: "Token is not right...",
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST - /auth/register # insert a new User
export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, plainTextPassword } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(409).json({ status: "error", error: "invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(409).json({ status: "error", error: "invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res
      .status(409)
      .json({
        status: "error",
        error: "password is too short. Should atleast 6 characters",
      });
  }

  //no matter how long the password is, encrypt length is the same
  const password = await bcrypt.hash(plainTextPassword, 10);

  const response = await new User({
    first_name,
    last_name,
    email,
    password,
  });

  try {
    await response.save();
    var token = jwt.sign(
      { id: response._id, email: response.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const user = await User.findOne({ email }).lean();
    await User.updateOne(
      {
        _id: user._id,
      },
      { $set: { user_id: user._id } }
    );

    return res.status(201).json({
      userId: response._id,
      token: token,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(405)
        .json({ status: "error", error: "Email already exist" });
    } else {
      // res.status(409).json({ message: error });
      throw error;
    }
  }
};

//POST - /auth/login # check insert data with database
export const login = async (req: Request, res: Response) => {
  const { email, plainTextPassword } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid username/password" });
  }

  bcrypt.compare(
    plainTextPassword,
    user.password,
    async function (err, result) {
      if (result) {
        await User.updateOne(
          {
            _id: user._id,
          },
          { $set: { lastLogin: Date.now(), $set: {userDetail: { is_online: true }} } }
        );

        var token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({
          userId: user._id,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ status: "error", error: "Invalid username/password" });
      }
    }
  );
};

//POST - /auth/change-password # change password with email..
export const forgetpassword = async (req: Request, res: Response) => {
  const { email, newPlainPassword, confirmNewPlainPassword } = req.body;

  const user = await User.findOne({ email }).lean();

  try {
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", error: "user is not exist" });
    }

    if (!newPlainPassword || typeof newPlainPassword !== "string") {
      return res
        .status(409)
        .json({ status: "error", error: "invalid password" });
    }

    if (newPlainPassword.length < 5) {
      return res
        .status(409)
        .json({
          status: "error",
          error: "password is too short. Should atleast 6 characters",
        });
    }

    if (newPlainPassword !== confirmNewPlainPassword) {
      return res
        .status(400)
        .json({ status: "error", error: "password is not same" });
    }

    const newPassword = await bcrypt.hash(newPlainPassword, 10);

    await User.updateOne(
      {
        _id: user._id,
      },
      { $set: { password: newPassword, lastPasswordReset: Date.now() } }
    );

    var token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
              expiresIn: "24h",
            });

    return res.status(201).json({
      userId: user._id,
      token: token,
    });

  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid username/password" });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var authSuccess: boolean;

//PUT - /user/profile/head/:email # update User profile
export const updateOneUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email } = req.params;

    const { first_name, last_name } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user === null) {
        return res.status(404).send(`No User with ${email}`);
      }

      const updateUserDetail = {
        _id: user.id,
        first_name,
        last_name,
      };

      const response = await User.findByIdAndUpdate(
        user._id,
        updateUserDetail,
        { new: true }
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile/body/:email # update User profile
export const updateOneUserProfile = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email } = req.params;

    const {
      gender,
      gender_interest,
      age,
      profile_picture,
      dob_date,
      dob_month,
      dob_year,
      height,
      nationality,
      occupation,
      hobbies,
      languages,
      description,
    } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user === null) {
        return res.status(404).send(`No User with ${email}`);
      }

      var valid = false;

      if (
        gender.valueOf() === GenderTypes.MALE ||
        gender.valueOf() === GenderTypes.FEMALE ||
        gender.valueOf() === GenderTypes.DIVERSE
      ) {
        valid = true;
      }
      if (valid === false) {
        return res.status(403).send(`Gender Type ${gender} is not valid`);
      }

      const updateUserDetail = {
        _id: user.id,
        userDetail: {
          is_online: true,
          gender,
          gender_interest,
          age,
          profile_picture,
          dob_date,
          dob_month,
          dob_year,
          height,
          nationality,
          occupation,
          hobbies,
          languages,
          description,
        },
      };

      const response = await User.findByIdAndUpdate(
        user._id,
        updateUserDetail,
        { new: true }
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile/id/:id/:matchedUserId # update oneSideMatch when swiped right By using Id
export const updateMatchedUserById = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id, matchedUserId } = req.params;

    try {
      const user = await User.findById( id );
      const matchedUser = await User.findById( matchedUserId );

      const updateMatch = {
        $push: { oneSideMatch: user._id },
      };

      await User.findByIdAndUpdate(matchedUser._id, updateMatch);

      res.status(200).json(matchedUser);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /alluser # return all User
export const getAllUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /singleuser/:id # return User with {id}
export const getOneUserDetailwithId = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /filtereduser/id/:id # return all User from gender interest by Id
export const getAllFilteredUserById = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if(authSuccess){
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      const gender = user.userDetail.gender
      const gender_interest = user.userDetail.gender_interest
      const interest = user.userDetail.hobbies

      const other_users = await User.find({_id:{ $ne: id }})

      var gendered_users = []

      for (var interested_gender of gender_interest) {
        for (var temp_user of other_users) {
          if(temp_user.userDetail.gender == interested_gender
            && temp_user.userDetail.gender_interest.includes(gender)) {
            gendered_users.push(temp_user)
          }
        }
      }

      var returnedUsers = []

      for(let filter of gendered_users){
        for(let user_interest of interest){
            if(filter.userDetail.hobbies.includes(user_interest)){
              returnedUsers.push(filter)
              break
            }
        }
      }

      res.status(200).json(returnedUsers);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//DELETE - /user/:userId
export const deleteUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST - /message/conversation/:userId1/:userId2 # create new Conversation 
export const createConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
  const { userId1, userId2 } = req.params;
  
  const members = [userId1, userId2]

  const message = await new Conversation({
    members
  });
    try {
      await message.save();

      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error});
    }
    authSuccess = false
  }
};

//put - /message/:conversationId # post new message from one conversation
export const updateMessage = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
  const { conversationId } = req.params
  const { userId, message} = req.body
  
    try {
      const messages = await new Message({
        conversationId: conversationId,
        sender: userId,
        message: message
      });

      await messages.save()
      res.status(200).json(messages);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  authSuccess = false;
  }
};

//GET - /allconversation # find all messages
export const getAllConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    try {
      const allConversation = await Conversation.find();
      res.status(200).json(allConversation);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }

};

//GET - /allconversation/:userId # find all messages from one particular user
export const getAllConversationFromOneUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { userId } = req.params;  
    
    try {
        const allConversation = await Conversation.find({members:{$all:[
          userId,
        ]}});
        
        res.status(200).json(allConversation);
      } catch (error) {
        res.status(404).json({ message: error });
      }
      authSuccess = false;
  }
  
};

//GET - /message/all/:conversationId # get all message history from one Conversation
export const getAllMessagesFromOneConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;

    try {
      const oneConversationId = await Message.find({conversationId: conversationId});

      res.status(200).json(oneConversationId);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /message/total/:conversationId # count each user message history from one Conversation
export const getTotalMessagesFromOneConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;

    try {
      const conversation = await Conversation.findById(conversationId)

      const total_user_1 = await Message.find({sender: conversation.members[0], conversationId: conversationId}).count()
      const total_user_2 = await Message.find({sender: conversation.members[1], conversationId: conversationId}).count()

      var totalMessages = []

      totalMessages.push(total_user_1)
      totalMessages.push(total_user_2)

      res.status(200).json(totalMessages);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

export default router;
