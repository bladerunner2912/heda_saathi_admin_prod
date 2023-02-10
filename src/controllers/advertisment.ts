import { NextFunction, Request, response, Response } from "express";

import mongoose from "mongoose";
import Logging from "../library/Logging";
import { createAccessToken } from "../middleware/auth.middlewares";

import Advertisment from "../models/advertisment";


const fetchAdvertisment = (async (req: Request, res: Response) => {
    let advertisments = [];
    try {
        advertisments = await Advertisment.find({});
        res.status(200).json(advertisments);
    } catch (e) {
        Logging.error(e);
        res.status(400).json({ message: `${e}` });
    }
});


export default { fetchAdvertisment };