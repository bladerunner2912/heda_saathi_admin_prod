import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../library/Logging";
import Family from "../models/family";
import User from "../models/user";

const createFamiy = async (req: Request, res: Response) => {
  const family = new Family({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  try {
    await family.save();
    return res.status(200).json({ family });
  } catch (e) {
    return res.status(500).json({ e });
  }
};

const fetchFamily = async (req: Request, res: Response) => {
  const familyId = req.body.familyId;
  try {
  const family = await Family.findOne(familyId);
    if (family) {
  const userIds = family['memberIds'];
  const user = await User.find({_id : {$in: userIds}});  
      res.status(200).json({ "family" : family, "user" : user });
      return;
    } else {
      res.status(200).json({ Message: `No Family Exists` });
      return;
    }
  } catch (e) {
    Logging.error(e);
    res.status(400).json({ message: e });
    return;
  }
};

const fetchFamilies = async (req: Request, res: Response) => {
  try {
    const families = await Family.find({});
    if (families) {
      res.status(200).json({ families });
    } else {
      res.status(200).json({message : 'No families babes'})
    }
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const deleteFamily = async (req: Request, res: Response) => {
  return await Family.findByIdAndDelete(req.params.id)
    .then((family) =>
      res.send(200).json({ message: "Family Deleted Succesfully" })
    )
    .catch((error) => {
      Logging.error(error);
      res.send(500).json({ error });
    });
};

const updateFamily = async (req: Request, res: Response) => {
  return await Family.findById(req.params.id)
    .then(async (family) => {
      if (family) {
        await family.update({ ...req.body });
        res.send(200).json({ family });
      } else {
        Logging.info("No User Found");
        res.send(400).json({ message: "No Family Found" });
      }
    })
    .catch((e) => {
      Logging.error(e);
      res.send(400).json({
        e,
      });
    });
};

export default {
  fetchFamily,
  deleteFamily,
  createFamiy,
  fetchFamilies,
  updateFamily,
};
