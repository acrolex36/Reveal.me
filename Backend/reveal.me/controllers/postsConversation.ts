import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Jimp from "jimp";

import fs from "fs"

import User from "../models/postUser";
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

var authSuccess: boolean;

//POST - /conversation/message/:userId1/:userId2 # create new Conversation
export const createConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { userId1, userId2 } = req.params;

    const members = [userId1, userId2];

    const message = await new Conversation({
      members,
    });
    try {
      await message.save();

      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /conversation/isblurred/:conversationId # update isBlurred when the target total message reached
export const updateIsBlurred = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;

    try {
      const update = {
        isBlurred: false,
      };

      const response = await Conversation.findByIdAndUpdate(
        conversationId,
        update,
        { new: true }
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /allconversation/:userId # find all messages from one particular user
export const getAllConversationFromOneUser = async (
  req: Request,
  res: Response
) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { userId } = req.params;

    try {
      const allConversation = await Conversation.find({
        members: { $all: [userId] },
      });

      res.status(200).json(allConversation);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /message/total/:conversationId # get total messages from each user in one conversation
export const getTotalMessages = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;

    try {
      const conversation = await Conversation.findById(conversationId);

      const total_user_1 = await Message.find({
        sender: conversation.members[0],
        conversationId: conversationId,
      }).count();
      const total_user_2 = await Message.find({
        sender: conversation.members[1],
        conversationId: conversationId,
      }).count();

      var totalMessages = [];

      totalMessages.push(total_user_1);
      totalMessages.push(total_user_2);

      res.status(200).json(totalMessages);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//get - /conversation/isblurred/:conversationId/:userId # retrieve picture
export const getPicture = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId, userId } = req.params;

    try {
      const conversation = await Conversation.findById(conversationId);

      const total_user_1 = await Message.find({
        sender: conversation.members[0],
        conversationId: conversationId,
      }).count();
      const total_user_2 = await Message.find({
        sender: conversation.members[1],
        conversationId: conversationId,
      }).count();

      var user;

      //set calculated Picture the opposite User
      if (conversation.members[0] == userId) {
        user = await User.findById(conversation.members[1]);
      }
      if (conversation.members[1] == userId) {
        user = await User.findById(conversation.members[0]);
      }

      const pictureUser = user.userDetail.profile_picture;
      const pictureData = pictureUser.split(",");
      var imageData = Buffer.from(pictureData[1], "base64");

      var result = await Jimp.read(imageData)

      var total_user_1_2 = total_user_1 + total_user_2;

      if (total_user_1 >= 5 && total_user_2 >= 5) {
        if (total_user_1 < 10 || total_user_2 < 10) {
          //   //level 1 unblur
          result.blur(80);
          // .write('80%Blur.png')
        }
      }
      else if (total_user_1 >= 10 && total_user_2 >= 10) {
        if (total_user_1 < 15 || total_user_2 < 15) {
          //level 2 unblur
          result.blur(50);
          // .write('50%Blur.png')
        }
      }
      else if (total_user_1 >= 15 && total_user_2 >= 15) {
          //original
          result.blur(0);
          // .write('test2.png')
      } 
      else {
        // max level blur
        result.blur(100);
        // .write('FullBlur.png')
      }

      var newImage = result.getBase64Async(result.getMIME());

      res.status(200).json(await newImage);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
};

//GET - /allconversation # find all conversation
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


//DELETE - /conversation/remove/:conversationId # delete all conversation with its messages
export const deleteConversation = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;
    try {
      const conversation = await Conversation.findByIdAndDelete(conversationId);
      const messages = await Message.find({ conversationId: conversationId });

      for (let message of messages) {
        await Message.findByIdAndDelete(message._id);
      }

      res.status(200).json(conversation);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

export default router;
