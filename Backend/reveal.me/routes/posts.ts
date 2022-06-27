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
  updateMatchedUserById

} from "../controllers/posts";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

router.put("/user/profile/head/:email", updateOneUser);
router.put("/user/profile/body/:email", updateOneUserProfile);
router.put("/user/profile/:email/:matchedUserEmail", updateMatchedUser); //not use
router.put("/user/profile/id/:id/:matchedUserId", updateMatchedUserById);

router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/id/:id", getOneUserDetailwithId);
router.get("/test/singleuser/email/:email", getOneUserDetail);
router.get("/test/filtereduser/id/:id", getAllFilteredUserById);
router.get("/test/filtereduser/email/:email", getAllFilteredUser); //not use

export default router;
