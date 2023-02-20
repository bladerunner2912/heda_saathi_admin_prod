import { Request, Response } from "express";
import mongoose, { Mongoose } from "mongoose";
import User from "../models/user";
import Notifications from "../models/notifications"
import Logging from "../library/Logging";


const fetchNotifications = (async (req: Request, res: Response,) => {
    try {
        const notifications = await Notifications.find().limit(15).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (e) {
        Logging.error(e);
        res.status(400).json(e);
    }
});

const createNotification = (async (req: Request, res: Response,) => {
    try {
        Logging.info(req.body)
        const id = new mongoose.Types.ObjectId();
        const notification = await Notifications.create(
            {
                "_id": id,
                "title": req.body.title,
                "content": req.body.content,
                "imageUrl": req.body.imageUrl,
                "webUrl": req.body.webUrl
            },
        );
        if (notification) {
            const user = await User.updateMany({}, {
                $push: {
                    "unviewedNotifications": id,
                }
            })
            console.log(user);
            res.status(200).json({ notification });
            return;
        }
        res.status(500).json({ "message": 'Internal Server Error' });
    } catch (e) {
        Logging.error(e);
        res.status(400).json(e);
    }
});


const viewedANotification = (async (req: Request, res: Response) => {
    try {

        const uid = new mongoose.Types.ObjectId(req.body.id);
        const nid = new mongoose.Types.ObjectId(req.body.nid);
        const user = await User.updateOne({ "_id": uid },
            {
                $pull: {
                    "unviewedNotifications": nid,
                }
            }
        );

        if (user) {
            res.status(200).json(true);
        }
        else {
            res.status(500).json(false);
        }

    } catch (e) {
        Logging.error(e);
        res.status(400).json(e);
    }
})

export default {
    createNotification, fetchNotifications, viewedANotification
}