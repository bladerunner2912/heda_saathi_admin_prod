import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import Logging from "../library/Logging";
import Family from "../models/family";

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
  return await Family.findById(req.params.familyId)
    .then((family) => res.send(200).json({ family }))
    .catch((error) => {
      Logging.error(error);
      res.send(500).json({ error });
    });
};

const fetchFamilies = async (req: Request, res: Response) => {
  return await Family.find()
    .then((families) => res.send(200).json({ families }))
    .catch((error) => {
      Logging.error(error);
      res.send(500).json({ error });
    });
};

const delteFamily = async (req: Request, res: Response) => {
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
  return await Family.findById(req.params.familyId)
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
  delteFamily,
  createFamiy,
  fetchFamilies,
  updateFamily,
};
