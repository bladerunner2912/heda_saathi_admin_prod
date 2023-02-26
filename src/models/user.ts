import { Ref } from "@typegoose/typegoose";
import mongoose, { Types, Document, Schema } from "mongoose";
import Family from "./family";

export interface IUser {
  name: String;
  phone: String;
  address: String;
  city: String;
  state: String;
  pincode: String;
  gender: String;
  dob: Date;
  married: String;
  familyId: Types.ObjectId;
  avatar: String;
  createdAt: Date;
  profession: String;
  email: String;
  unviewedNotificaitons: Array<Types.ObjectId>;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    gender: { type: String, default: "Male" },
    dob: { type: Date },
    married: { type: String, default: "Married" },
    familyId: { type: Schema.Types.ObjectId, ref: "Family" },
    avatar: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    profession: { type: String },
    email: { type: String },
    unviewedNotifications: {
      type: [Schema.Types.ObjectId],
      ref: "Notificaiton",
    }
  },
  {
    timestamps: { createdAt: "createdAt" },
    versionKey: false,
  }
);



export default mongoose.model("User", UserSchema);
