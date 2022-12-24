import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import Logging from "../library/Logging";

import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  try {
    await user.save();
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

const findUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;

  try {
    const user = await User.findById(uid);
    return user
      ? res.status(200).json(user)
      : res.status(200).json({ message: "User Not Found" });
  } catch (e) {
    res.status(500);
  }
};

const findAllUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;

  try {
    const users = await User.find({}).catch((e) => Logging.error(e));
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ e });
  }
};

function updateUser(req: Request, res: Response) {
  const uid = req.params.userId;

  return User.findById(uid)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => {
            res.status(201).json({ user });
          })
          .catch((e) => {
            res.status(500).json({ e });
          });
      }
    })
    .catch((e) => {
      res.status(500).json({ e });
    });
}

const deleteUser = async (req: Request, res: Response) => {
  const uid = req.params.userId;

  try {
    const author = await User.findByIdAndDelete(uid);
    return author
      ? res.status(400).json({ message: "User Deleted Succesfully" })
      : res.status(400).json({ message: "User Not Found" });
  } catch (e) {
    console.log(e);
  }
};

export default { deleteUser, createUser, updateUser, findUser, findAllUser };
