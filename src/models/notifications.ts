import mongoose, { Types, Document, Schema } from "mongoose";

export interface INotificaiton {
    title: String;
    content: String;
    imageUrl: String;
    webUrl: String;
};

export interface INotificationModel extends INotificaiton, Document { }


const NotificationSchema: Schema = new Schema(
    {
        title: {
            required: true,
            type: String,
        },
        content: {
            required: true,
            type: String,
        },
        iamgeUrl: {
            type: String,
        },
        webUrl: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: "createdAt",
        },
    }
)



const Notifications = mongoose.model<INotificationModel>("Notification", NotificationSchema);

export default Notifications;