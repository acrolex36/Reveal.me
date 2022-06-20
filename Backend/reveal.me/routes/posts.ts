import express from "express";
import {
  register,
  login,
  changePassword,
  getAllUser,
  getOneUser,

} from "../controllers/posts";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forgetpassword", changePassword);

router.get("/test/alluser", getAllUser);
router.get("/test/singleuser/:id", getOneUser);

export default router;
