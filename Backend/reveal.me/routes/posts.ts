import express from "express";
import {
    register,
    login,
    forgetpassword,

    updateOneUser,
    updateOneUserProfile,
    updateMatchedUserById,
    removeMatchedUser,
    updateSwipedLeftUsers,
    removeOneSwipedLeftUsers,

    getAllUser,
    getOneUserDetailwithId,
    getAllFilteredUserById,
    getAllGenderedUserById,

    deleteUser,

} from "../controllers/postsUser";

import {
    createConversation,

    updateIsBlurred,

    getAllConversation,
    getAllConversationFromOneUser,
    getTotalMessages,

    getPicture,

    deleteConversation,

} from "../controllers/postsConversation"

import {
    getAllMessages,
    createMessage,

} from "../controllers/postsMessage"

const router = express.Router();

//Authentification 
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

router.put("/user/profile/head/:email", updateOneUser);
router.put("/user/profile/body/:email", updateOneUserProfile);
router.put("/user/profile/id/:id/:matchedUserId", updateMatchedUserById);
router.put("/user/profile/remove/id/:id/:matchedUserId", removeMatchedUser);
router.put("/user/profile/swipedleft/id/:id/:matchedUserId", updateSwipedLeftUsers);
router.put("/user/profile/swipedleft/remove/id/:id", removeOneSwipedLeftUsers);

router.delete("/user/:id", deleteUser)

router.get("/alluser", getAllUser);
router.get("/singleuser/id/:id", getOneUserDetailwithId);
router.get("/filtereduser/id/:id", getAllFilteredUserById);
router.get("/gendereduser/id/:id", getAllGenderedUserById);


//Conversation
router.post("/conversation/message/:userId1/:userId2", createConversation);

router.put("/conversation/isblurred/:conversationId", updateIsBlurred);//notu´use

router.get("/allconversation", getAllConversation);
router.get("/allconversation/:userId", getAllConversationFromOneUser);

router.get("/message/total/:conversationId", getTotalMessages);//not use

router.get("/conversation/user/picture/:conversationId/:userId", getPicture)

router.delete("/conversation/remove/:conversationId", deleteConversation);

//Message
router.post("/message/:conversationId", createMessage);

router.get("/message/all/:conversationId", getAllMessages);

export default router;
