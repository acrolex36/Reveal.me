import express from "express";
import {
  register,
  login,
  forgetpassword,
  updateOneUser,
  updateOneUserProfile,
  getAllUser,
  getOneUserDetailwithId,
  getOneUserDetail

} from "../controllers/posts";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

router.put("/user/profile/head/:email", updateOneUser);
router.put("/user/profile/body/:email", updateOneUserProfile);

router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/:id", getOneUserDetailwithId);
router.get("/test/singleuser/:email", getOneUserDetail);

export default router;
