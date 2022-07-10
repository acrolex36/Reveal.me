import express from "express";
import {
  register,
  login,
  forgetpassword,

  updateOneUser,
  updateOneUserProfile,
  
  getAllUser,
  getOneUserDetailwithId,
  getAllFilteredUserById,
  updateMatchedUserById,
  createConversation,
  getAllConversation,
  getAllConversationFromOneUser,
  updateMessage,
  getTotalMessagesFromOneConversation,
  getAllMessagesFromOneConversation,
  deleteUser

} from "../controllers/posts";

const router = express.Router();

//Authentication
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

//User
router.put("/user/profile/head/:email", updateOneUser);
router.put("/user/profile/body/:email", updateOneUserProfile);
router.put("/user/profile/id/:id/:matchedUserId", updateMatchedUserById);

router.get("/alluser", getAllUser);
router.get("/singleuser/id/:id", getOneUserDetailwithId);
router.get("/filtereduser/id/:id", getAllFilteredUserById);

router.delete("/user/:id", deleteUser)

//Chat
router.post("/conversation/message/:userId1/:userId2", createConversation);

router.put("/message/:conversationId", updateMessage);

router.get("/allconversation", getAllConversation);
router.get("/allconversation/:userId", getAllConversationFromOneUser);
router.get("/message/all/:conversationId", getAllMessagesFromOneConversation);
router.get("/message/total/:conversationId", getTotalMessagesFromOneConversation);

export default router;
