import express, { Request, response, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { GenderTypes } from "../models/postUser";
import Message from "../models/postMessages";

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
        // console.log(decoded);
        next();
      }
    });
  } else {
    return res.json({
      message: "Token is not right...",
    });
  }
};

//POST - /auth/register # insert a new User
export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, plainTextPassword } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(409).json({ status: "error", error: "invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(409).json({ status: "error", error: "invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res
      .status(409)
      .json({
        status: "error",
        error: "password is too short. Should atleast 6 characters",
      });
  }

  //no matter how long the password is, encrypt length is the same
  const password = await bcrypt.hash(plainTextPassword, 10);

  const response = await new User({
    first_name,
    last_name,
    email,
    password,
  });

  try {
    await response.save();
    var token = jwt.sign(
      { id: response._id, email: response.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const user = await User.findOne({ email }).lean();
    await User.updateOne(
      {
        _id: user._id,
      },
      { $set: { user_id: user._id } }
    );

    // console.log("User created successfully", response)

    return res.status(201).json({
      userId: response._id,
      // "email": response.email,
      token: token,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(405)
        .json({ status: "error", error: "Email already exist" });
    } else {
      // res.status(409).json({ message: error });
      throw error;
    }
  }
};

//POST - /auth/login # check insert data with database
export const login = async (req: Request, res: Response) => {
  const { email, plainTextPassword } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid username/password" });
  }

  bcrypt.compare(
    plainTextPassword,
    user.password,
    async function (err, result) {
      if (result) {
        await User.updateOne(
          {
            _id: user._id,
          },
          { $set: { lastLogin: Date.now(), userDetail: { is_online: true } } }
        );

        var token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({
          userId: user._id,
          // "email": user.email,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ status: "error", error: "Invalid username/password" });
      }
    }
  );
};

//POST - /auth/change-password # change password with email..
export const forgetpassword = async (req: Request, res: Response) => {
  const { email, newPlainPassword, confirmNewPlainPassword } = req.body;

  const user = await User.findOne({ email }).lean();

  try {
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", error: "user is not exist" });
    }

    if (!newPlainPassword || typeof newPlainPassword !== "string") {
      return res
        .status(409)
        .json({ status: "error", error: "invalid password" });
    }

    if (newPlainPassword.length < 5) {
      return res
        .status(409)
        .json({
          status: "error",
          error: "password is too short. Should atleast 6 characters",
        });
    }

    if (newPlainPassword !== confirmNewPlainPassword) {
      return res
        .status(400)
        .json({ status: "error", error: "password is not same" });
    }

    const newPassword = await bcrypt.hash(newPlainPassword, 10);

    await User.updateOne(
      {
        _id: user._id,
      },
      { $set: { password: newPassword, lastPasswordReset: Date.now() } }
    );

    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid username/password" });
  }
};

var authSuccess: boolean;

//PUT - /user/profile # update User profile
export const updateOneUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email } = req.params;

    const { first_name, last_name } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user === null) {
        return res.status(404).send(`No User with ${email}`);
      }

      const updateUserDetail = {
        _id: user.id,
        first_name,
        last_name,
      };

      const response = await User.findByIdAndUpdate(
        user._id,
        updateUserDetail,
        { new: true }
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile # update User profile
export const updateOneUserProfile = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email } = req.params;

    const {
      gender,
      gender_interest,
      age,
      profile_picture,
      dob_date,
      dob_month,
      dob_year,
      height,
      nationality,
      education,
      interest,
      language,
    } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user === null) {
        return res.status(404).send(`No User with ${email}`);
      }

      var valid = false;

      if (
        gender.valueOf() === GenderTypes.MALE ||
        gender.valueOf() === GenderTypes.FEMALE ||
        gender.valueOf() === GenderTypes.DIVERSE
      ) {
        valid = true;
      }
      if (valid === false) {
        return res.status(403).send(`Gender Type ${gender} is not valid`);
      }

      // var parsedGenderInterest
      // for(var i = 0 ; i < gender_interest.length ; i++){

      // }

      const updateUserDetail = {
        _id: user.id,
        userDetail: {
          is_online: true,
          gender,
          gender_interest,
          age,
          profile_picture,
          dob_date,
          dob_month,
          dob_year,
          height,
          nationality,
          education,
          interest,
          language,
        },
      };

      const response = await User.findByIdAndUpdate(
        user._id,
        updateUserDetail,
        { new: true }
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - update oneSideMatch when swiped right
export const updateMatchedUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email, matchedUserEmail } = req.params;

    try {
      const user = await User.findOne({ email });
      const matchedUser = await User.findOne({ email: matchedUserEmail });

      const updateMatch = {
        $push: { oneSideMatch: user._id },
      };

      await User.findByIdAndUpdate(matchedUser._id, updateMatch);

      res.status(200).json(matchedUser);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /test/alluser # return all User
export const getAllUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
    // return res.status(200).send({data: "success"});
  });

  if (authSuccess) {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /test/singleuser/:id # return User with {id}
export const getOneUserDetailwithId = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /test/filtereduser # return all User from gender interest
export const getAllFilteredUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
    // return res.status(200).send({data: "success"});
  });

  if (authSuccess) {
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });

      const gender = user.userDetail.gender;
      const gender_interest = user.userDetail.gender_interest;
      const interest = user.userDetail.interest;

      const other_users = await User.find({ email: { $ne: email } });

      var gendered_users = [];

      for (var interested_gender of gender_interest) {
        for (var temp_user of other_users) {
          if (
            temp_user.userDetail.gender === interested_gender &&
            temp_user.userDetail.gender_interest.includes(gender)
          ) {
            gendered_users.push(temp_user);
          }
        }
      }

      var returnedUsers = [];

      for (let filter of gendered_users) {
        for (let user_interest of interest) {
          if (filter.userDetail.interest.includes(user_interest)) {
            returnedUsers.push(filter);
            break;
          }
        }
      }
      res.status(200).json(returnedUsers);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /test/filtereduser # return all User from gender interest
export const getAllFilteredUserById = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      // const user = await User.findOne({email}).lean() //without userDetail

      //  if(user === null){
      //   res.status(410).json("lol");
      //   }

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
  // checkToken(req,res, () => {
  //   authSuccess = true;
  //   // return res.status(200).send({data: "success"});
  // })

  // if(authSuccess){
  //   const { email } = req.params

  //   try {
  //     const user = await User.findOne( {email} )

  //     const gender = user.userDetail.gender
  //     const gender_interest = user.userDetail.gender_interest
  //     const interest = user.userDetail.interest

  //     const other_users = await User.find({email: { $ne: email }})

  //     var gendered_users = []

  //     for (var interested_gender of gender_interest) {
  //       for (var temp_user of other_users) {
  //         if(temp_user.userDetail.gender == interested_gender
  //           && temp_user.userDetail.gender_interest.includes(gender)) {
  //           gendered_users.push(temp_user)
  //         }
  //       }
  //     }

  //     var returnedUsers = []

  //     for(let filter of gendered_users){
  //       for(let user_interest of interest){
  //           if(filter.userDetail.interest.includes(user_interest)){
  //             returnedUsers.push(filter)
  //             break
  //           }
  //       }
  //     }

  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(404).json({ message: error });
  //   }
  //   authSuccess = false;
  // }
};

//GET - /test/singleuser/:email # return User with {email}
export const getOneUserDetail = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      // const user = await User.findOne({email}).lean() //without userDetail

      //  if(user === null){
      //   res.status(410).json("lol");
      //   }

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
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
