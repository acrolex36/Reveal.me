import express from "express";
import {
  register,
  login,
  forgetpassword,

  updateOneUser,
  updateOneUserProfile,
  updateMatchedUser,
  
  getAllUser,
  getOneUserDetailwithId,
  getOneUserDetail,
  getAllFilteredUser,
  getAllFilteredUserById,
  updateMatchedUserById,
  createConversation,
  getAllConversation,
  updateMessages,
  getOneConversation,
  getAllConversationFromOneUser,
  getTotalMessage,
  getOneConversationById

} from "../controllers/posts";

const router = express.Router();

//Authentification 
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

router.put("/user/profile/head/:email", updateOneUser);
router.put("/user/profile/body/:email", updateOneUserProfile);
router.put("/user/profile/:email/:matchedUserEmail", updateMatchedUser); //not use
router.put("/user/profile/id/:id/:matchedUserId", updateMatchedUserById);


router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/id/:id", getOneUserDetailwithId);
router.get("/test/singleuser/email/:email", getOneUserDetail); //not use
router.get("/filtereduser/id/:id", getAllFilteredUserById);
router.get("/test/filtereduser/email/:email", getAllFilteredUser); //not use

//Message
router.post("/conversation/message/:userId1/:userId2", createConversation);

router.put("/conversation/message/:id", updateMessages);

router.get("/test/allconversation", getAllConversation);
router.get("/allconversation/:userId", getAllConversationFromOneUser);
router.get("/oneconversation/:userId1/:userId2", getOneConversation);
router.get("/oneconversationid/:id", getOneConversationById);
router.get("/oneconversation/totalmessage/:userId1/:userId2", getTotalMessage);




export default router;
