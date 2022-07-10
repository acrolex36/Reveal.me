import express, { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { GenderTypes } from "../models/postUser";
import Conversation from "../models/postConversation";


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

    return res.status(201).json({
      userId: response._id,
      token: token,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(405)
        .json({ status: "error", error: "Email already exist" });
    } else {
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
          { $set: { lastLogin: Date.now(), $set: {userDetail: { is_online: true }} } }
        );

        var token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({
          userId: user._id,
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

//PUT - /user/profile/head/:email # update User profile
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

//PUT - /user/profile/body/:email # update User profile
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
      occupation,
      hobbies,
      languages,
      description,
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
          occupation,
          hobbies,
          languages,
          description,
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

//PUT - /user/profile/id/:id/:matchedUserId # update oneSideMatch when swiped right By using Id
export const updateMatchedUserById = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id, matchedUserId } = req.params;

    try {
      const user = await User.findById( id );
      const matchedUser = await User.findById( matchedUserId );

      const updateMatch = {
        $addToSet: { oneSideMatch: user._id },
      };

      const response = await User.findByIdAndUpdate(matchedUser._id, updateMatch, { new: true });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile/remove/id/:id/:matchedUserId # remove user from OneSideMatch when both of them matched
export const removeMatchedUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id, matchedUserId } = req.params;

    try {
      const user = await User.findById( id );
      const matchedUser = await User.findById( matchedUserId );

      const updateMatch = {
        $pull: { oneSideMatch: matchedUser._id },
      };

      const response = await User.findByIdAndUpdate(user._id, updateMatch, { new: true });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile/swipedleft/id/:id/:matchedUserId # update swipedLeftUsers when user swiped left
export const updateSwipedLeftUsers = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id, matchedUserId } = req.params;

    try {
      const user = await User.findById( id );
      const matchedUser = await User.findById( matchedUserId );

      const updateMatch = {
        $addToSet: { swipedLeftUsers: matchedUser._id },
      };

      const response = await User.findByIdAndUpdate(user._id, updateMatch, { new: true });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//PUT - /user/profile/swipedleft/remove/id/:id # update swipedLeftUsers when undo Button pressed
export const removeOneSwipedLeftUsers = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;

    try {
      const user = await User.findById( id );

      if(user.swipedLeftUsers.length === 0) {
        return res
          .status(400)
          .json({
            status: "error",
            error: "There is no user",
          });
      }

      const size = user.swipedLeftUsers.length - 1
      const lastUser = user.swipedLeftUsers[size]


      const updateSwipedLeftUser = {
        $pull: { swipedLeftUsers: lastUser},
      };

      await User.findByIdAndUpdate(user._id, updateSwipedLeftUser, { new: true });

      res.status(200).json(lastUser);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

//GET - /alluser # return all User
export const getAllUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
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

//GET - /singleuser/:id # return User with {id}
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

//GET - /filtereduser/id/:id # return all User that has been filtered
export const getAllFilteredUserById = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if(authSuccess){
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      const gender = user.userDetail.gender
      const gender_interest = user.userDetail.gender_interest
      const interest = user.userDetail.hobbies
      const swipedLeftUsers = user.swipedLeftUsers

      const other_users = await User.find({_id:{ $ne: id }})
      
      const userConversation = await Conversation.find({members:{$all:[
        id
      ]}})
      
      var matchedUsers = []

      for(let temp_members of userConversation){
        if(temp_members.members[0] !== id){
          matchedUsers.push(temp_members.members[0].toString())
        }  else {
          matchedUsers.push(temp_members.members[1].toString())
        }
      }

      //Users that has not been swiped left
      var remainingUsers = []

      for(var not_user of other_users) {
        if((matchedUsers.includes(not_user._id.valueOf())) || (swipedLeftUsers.includes(not_user._id.valueOf()))){
          continue
        } else{
            remainingUsers.push(not_user)
        }                    
      }

      var gendered_users = []

      for (var interested_gender of gender_interest) {
        for (let temp_user of remainingUsers) {
          if(temp_user.userDetail.gender == interested_gender
            && temp_user.userDetail.gender_interest.includes(gender)) {
            gendered_users.push(temp_user)
          }
        }
      }

      var returnedUsers = []

      for(let filter of gendered_users){
        for(let user_interest of interest){
            if(filter.userDetail.hobbies.includes(user_interest)){
              returnedUsers.push(filter)
              break
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

//DELETE - /user/:userId # delete user
export const deleteUser = async (req: Request, res: Response) => {
  checkToken(req, res, () => {
    authSuccess = true;
  });

  if (authSuccess) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ message: error });
    }
    authSuccess = false;
  }
};

export default router;
