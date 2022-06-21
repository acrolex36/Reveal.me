import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/postUser";
import UserDetail from "../models/postUserDetail";
import Message from "../models/postMessages";

const router = express.Router();


const JWT_SECRET = "asdfhasdfwqber12312sa";

//POST - /auth/register # insert a new User
export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, plainTextPassword } =
    req.body;

  if(!email || typeof email !== "string"){
    return res.status(409).json({status: "error", error: "invalid email"});
  }

  if(!plainTextPassword || typeof plainTextPassword !== "string"){
    return res.status(409).json({status: "error", error: "invalid password"});
  }

  if(plainTextPassword.length < 5){
    return res.status(409).json({status: "error", error: "password is too short. Should atleast 6 characters"});
  }

  //no matter how long the password is, encrypt length is the same
  const password = await bcrypt.hash(plainTextPassword, 10);

  const response = await new User({
    first_name,
    last_name,
    email,
    password
  });

  try {

    await response.save();

    // console.log("User created successfully", response)

    return res.status(201).json(response);
  } catch (error: any) {
    if(error.code === 11000){
      return res.status(405).json({status: "error", error: "Email already exist"})
    }else{
      // res.status(409).json({ message: error });
      throw error;
    }
  }
};

//POST - /auth/login # check insert data with database
export const login = async (req: Request, res: Response) => {
  const { email, plainTextPassword } =
    req.body;

  const user = await User.findOne({email}).lean()

  if(!user){
    return res.status(400).json({status: "error", error: "Invalid username/password"})
  }

  bcrypt.compare(plainTextPassword, user.password, async function(err, result){
    if(result){
      
      await User.updateOne({
        _id: user._id
      },{$set : { lastLogin: Date.now()} });

      const token = jwt.sign({ id: user._id, email: user.email}, JWT_SECRET);
      return res.status(201).json({user,"token": token});
    }
    else{
      return res.status(400).json({status: "error", error: "Invalid username/password"})
    }
  });

};

interface JwtPayload {
  _id: string
}

//POST - /auth/change-password # change password with email..
export const changePassword = async (req: Request, res: Response) => {
  // const { token , newPlainPassword} =
  //   req.body;

  const { email, newPlainPassword, confirmNewPlainPassword } =
  req.body;

  const user = await User.findOne({email}).lean()

  try{
  // const user = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if(!user){
    return res.status(400).json({status: "error", error: "user is not exist"})
  }

  if(!newPlainPassword || typeof newPlainPassword !== "string"){
    return res.status(409).json({status: "error", error: "invalid password"});
  }

  if(newPlainPassword.length < 5){
    return res.status(409).json({status: "error", error: "password is too short. Should atleast 6 characters"});
  }

  if(newPlainPassword !== confirmNewPlainPassword){
    return res.status(400).json({status: "error", error: "password is not same"})
  }

  const newPassword = await bcrypt.hash(newPlainPassword, 10);

  await User.updateOne({
    _id: user._id
  },{$set : { password: newPassword, lastPasswordReset: Date.now()} })

    return res.status(201).json(user);
}
catch(error){
  return res.status(400).json({status: "error", error: "Invalid username/password"})
}
};


//GET - /test/alluser # return all User
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const postMessages = await User.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//GET - /test/singleuser/:id # return User with {id nr}
export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await User.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};


// //POST - /recipe # insert a new Recipe
// export const createNewRecipe = async (req: Request, res: Response) => {
//   const { title, description, selectedFile, instruction, ingredient } =
//     req.body;

//   const newPostMessage = new PostMessage({
//     title,
//     description,
//     selectedFile,
//     instruction,
//     ingredient,
//   });

//   try {
//     await newPostMessage.save();

//     res.status(201).json(newPostMessage);
//   } catch (error) {
//     res.status(409).json({ message: error });
//   }
// };

// //PUT - /recipe/:{id} # update exist recipe with {id nr}
// export const updateRecipe = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, description, ingredient, instruction } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   const updatedPost = { title, description, ingredient, instruction, _id: id };

//   await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//   res.json(updatedPost);
// };

// //DELETE - /recipe/:{id} # delete recipe with {id nr}
// export const deleteRecipe = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   await PostMessage.findByIdAndRemove(id);

//   res.json({ message: "Post deleted successfully." });
// };

// //PUT - /recipe/:{id}/likeRecipe # update exist recipe like value with {id nr}
// export const likeRecipe = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   const post = await PostMessage.findById(id);

//   const updatedPost = await PostMessage.findByIdAndUpdate(
//     id,
//     { likeCount: post.likeCount + 1 },
//     { new: true }
//   );

//   res.json(updatedPost);
// };

export default router;
