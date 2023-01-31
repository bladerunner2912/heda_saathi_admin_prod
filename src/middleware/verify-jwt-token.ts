import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/user";

export const verifyJwtToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authorization: string = req.headers.authorization || "";

  if (authorization) {
    const token = authorization.split(" ")[1];
    // console.log(req['files']);
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    if (payload.type != undefined) {
      const user = await User.findById(payload.userId).exec();
      if (user) {
        req.body.user = user._id;
        return next();
      } else {
        res.status(401).json({ message: "You are not authenticated." });
      }
    }
    const userId = payload.userId;
    // const user = await UserModel.findById(payload.userId).exec();
    if (userId) {
      req.body.user = userId;
      return next();
    } else {
      res.status(401).json({ message: "You are not authenticated." });
    }
  } else {
    res.status(401).json({ message: "You are not authenticated." });
  }
  return { user: null };
};
