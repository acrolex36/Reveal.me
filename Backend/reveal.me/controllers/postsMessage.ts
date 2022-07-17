import express, { Request, response, Response } from "express";
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

var authSuccess: boolean;

//POST - /message/:conversationId # create new message from a conversation
export const createMessage = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;
    const { userId, message } = req.body;

    try {
      const messages = await new Message({
        conversationId: conversationId,
        sender: userId,
        message: message,
      });

      await messages.save();
      res.status(201).json(messages);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /message/all/:conversationId # return all messages from a conversation
export const getAllMessages = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { conversationId } = req.params;

    try {
      const oneConversationId = await Message.find({
        conversationId: conversationId,
      });

      res.status(200).json(oneConversationId);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

export default router;
