import express from "express";
import {
  register,
  login,
  forgetpassword,
  updateOneUserProfile,
  getAllUser,
  getOneUserDetail,
  getAllFilteredUser,
  getAllFilteredUserById,
  updateMatchedUser,

} from "../controllers/posts";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login/forgetpassword", forgetpassword);

router.put("/user/profile/:email", updateOneUserProfile);
router.put("/user/profile/:email/:matchedUserEmail", updateMatchedUser);

router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/:email", getOneUserDetail);
router.get("/test/filtereduser/:email", getAllFilteredUser)
router.get("/test/filtereduser/:id", getAllFilteredUserById)

export default router;
