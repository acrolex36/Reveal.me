import express from "express";
import {
  register,
  login,
  changePassword,
  updateOneUserProfile,
  getAllUser,
  getOneUserDetail,

} from "../controllers/posts";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("//login/forgetpasswordauth", changePassword);

router.put("/user/profile/:email", updateOneUserProfile);

router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/:email", getOneUserDetail);

export default router;
